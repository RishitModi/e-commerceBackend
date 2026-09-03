package com.modeiji.store.reviews;

import com.modeiji.store.auth.AuthService;
import com.modeiji.store.products.ProductRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products/{productId}/reviews")
@AllArgsConstructor
public class ReviewController {
    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;
    private final ProductRepository productRepository;
    private final AuthService authService;

    @GetMapping
    public List<ReviewDto> getReviews(@PathVariable Long productId) {
        return reviewRepository.findByProductIdOrderByCreatedAtDesc(productId)
            .stream()
            .map(reviewMapper::toDto)
            .toList();
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
