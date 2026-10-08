package com.modeiji.store.reviews;

import com.modeiji.store.auth.AuthService;
import com.modeiji.store.products.ProductRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/products/{productId}/reviews")
@AllArgsConstructor
public class ReviewController {
    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;
    private final ProductRepository productRepository;
    private final AuthService authService;
    private final SentimentService sentimentService;

    @GetMapping
    public List<ReviewDto> getReviews(@PathVariable Long productId) {
        return reviewRepository.findByProductIdOrderByCreatedAtDesc(productId)
            .stream()
            .map(review -> sentimentService.ensureSentiment(review, reviewRepository))
            .map(reviewMapper::toDto)
            .toList();
    }

    @GetMapping("/summary")
    public ReviewSummaryDto getReviewSummary(@PathVariable Long productId) {
        var reviews = reviewRepository.findByProductIdOrderByCreatedAtDesc(productId);
        var sentimentCounts = new HashMap<String, Long>();
        sentimentCounts.put("positive", 0L);
        sentimentCounts.put("neutral", 0L);
        sentimentCounts.put("negative", 0L);

        for (Object[] result : reviewRepository.countBySentimentLabel(productId)) {
            String label = result[0] == null ? null : result[0].toString().trim().toLowerCase();
            Long count = ((Number) result[1]).longValue();

            if (label != null && sentimentCounts.containsKey(label)) {
                sentimentCounts.put(label, count);
            }
        }

        return new ReviewSummaryDto(
            reviews.size(),
            reviewRepository.averageRating(productId),
            sentimentCounts
        );
    }

    @PostMapping
    public ResponseEntity<ReviewDto> createReview(
        @PathVariable Long productId,
        @Valid @RequestBody CreateReviewRequest request
    ) {
        var product = productRepository.findById(productId).orElse(null);
        if (product == null) {
            return ResponseEntity.notFound().build();
        }

        var review = new Review();
        review.setProduct(product);
        review.setUser(authService.getCurrentUser());
        review.setRating(request.getRating());
        review.setComment(request.getComment());
        review = reviewRepository.save(review);

        return ResponseEntity.status(201).body(reviewMapper.toDto(review));
    }
}
