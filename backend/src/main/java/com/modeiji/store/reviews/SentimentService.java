package com.modeiji.store.reviews;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.math.BigDecimal;
import java.util.Map;

@Service
public class SentimentService {
    private final String serviceUrl;
    private final RestClient restClient;

    public SentimentService(@Value("${sentiment.serviceUrl}") String serviceUrl) {
        this.serviceUrl = serviceUrl;
        this.restClient = RestClient.create();
    }

    public Review ensureSentiment(Review review, ReviewRepository reviewRepository) {
        if (review.getSentimentLabel() != null && !review.getSentimentLabel().isBlank()) {
            return review;
        }

        if (review.getComment() == null || review.getComment().isBlank()) {
            return review;
        }

        try {
            Map<String, Object> response = restClient.post()
                .uri(serviceUrl + "/analyze-sentiment")
                .body(Map.of("text", review.getComment()))
                .retrieve()
                .body(Map.class);

            if (response == null) {
                return review;
            }

            Object labelObject = response.get("label");
            Object confidenceObject = response.get("confidence");

            if (!(labelObject instanceof String label) || label.isBlank()) {
                return review;
            }
            if (!(confidenceObject instanceof Number confidence)) {
                return review;
            }

            review.setSentimentLabel(label);
            review.setSentimentScore(BigDecimal.valueOf(confidence.doubleValue()));
            return reviewRepository.save(review);
        } catch (Exception ex) {
            return review;
        }
    }
}
