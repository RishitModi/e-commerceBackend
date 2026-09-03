from __future__ import annotations
import json
from pathlib import Path
from typing import Dict

import torch
import torch.nn.functional as F
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import AutoModelForSequenceClassification, AutoTokenizer

# Load model and tokenizer once at module import (service startup)
MODEL_DIR = Path(__file__).parent / "sentiment-model-export"

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load tokenizer and model
tokenizer = AutoTokenizer.from_pretrained(MODEL_DIR)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_DIR)

# Load label mapping (id -> label)
_label_map_path = MODEL_DIR / "label_mapping.json"
if _label_map_path.exists():
    with _label_map_path.open("r", encoding="utf-8") as f:
        raw_map = json.load(f)
    # Extract nested id2label and convert string keys to ints
    id2label = {int(k): v for k, v in raw_map.get("id2label", {}).items()}
else:
    # Fallback to model config if available
    id2label = getattr(model.config, "id2label", None) or {}

model.config.id2label = {k: v for k, v in id2label.items()} if id2label else {}
model.to(device)
model.eval()

app = FastAPI()


class SentimentRequest(BaseModel):
    text: str


class SentimentResponse(BaseModel):
    label: str
    confidence: float
    scores: dict[str, float]


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/analyze-sentiment", response_model=SentimentResponse)
async def analyze_sentiment(req: SentimentRequest):
    text = req.text
    if not text or text.strip() == "":
        raise HTTPException(status_code=400, detail="text must not be empty or whitespace")

    # Tokenize
    inputs = tokenizer(
        text,
        truncation=True,
        max_length=512,
        return_tensors="pt",
    )

    # Move tensors to model device
    inputs = {k: v.to(device) for k, v in inputs.items()}

    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        probs = F.softmax(logits, dim=-1)[0]

    # Build scores dict mapping label -> probability
    # Use id2label mapping; fallback to stringified indices
    scores: Dict[str, float] = {}
    for idx, prob in enumerate(probs.tolist()):
        label = id2label.get(idx, str(idx)) if isinstance(id2label, dict) else str(idx)
        scores[str(label)] = float(prob)

    # Choose predicted label and confidence
    max_idx = int(torch.argmax(probs).item())
    predicted_label = id2label.get(max_idx, str(max_idx))
    confidence = float(probs[max_idx].item())

    return SentimentResponse(label=str(predicted_label), confidence=confidence, scores=scores)
