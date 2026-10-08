package com.modeiji.store.reviews;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.math.BigDecimal;
import java.util.Map;

@Service
public class SentimentService {
    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(SentimentService.class);
    private final String serviceUrl;
    private final RestClient restClient;

    public SentimentService(@Value("${sentiment.serviceUrl}") String serviceUrl) {
        this.serviceUrl = serviceUrl;
        this.restClient = RestClient.builder()
            .requestFactory(new SimpleClientHttpRequestFactory())
            .build();
    }

    public Review ensureSentiment(Review review, ReviewRepository reviewRepository) {
        log.info("ensureSentiment called for review id={}, current label={}",
            review.getId(), review.getSentimentLabel());
        if (review.getSentimentLabel() != null && !review.getSentimentLabel().isBlank()) {
            return review;
        }

        if (review.getComment() == null || review.getComment().isBlank()) {
            return review;
        }

        log.info("Proceeding to call sentiment service for review id={}", review.getId());

        try {
            Map<String, Object> response = restClient.post()
                .uri(serviceUrl + "/analyze-sentiment")
                .body(Map.of("text", review.getComment()))
                .retrieve()
                .body(Map.class);
            log.info("Sentiment service raw response for review id={}: {}", review.getId(), response);

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
            log.info("About to save review id={} with label={}, score={}",
                review.getId(), review.getSentimentLabel(), review.getSentimentScore());
            Review savedReview = reviewRepository.save(review);
            log.info("Save completed for review id={}", review.getId());
            return savedReview;
        } catch (Exception ex) {
            log.error("Sentiment scoring failed for review {}: {}", review.getId(), ex.getMessage(), ex);
            return review;
        }
    }
}
