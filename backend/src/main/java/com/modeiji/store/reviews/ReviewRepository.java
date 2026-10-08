package com.modeiji.store.reviews;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByProductIdOrderByCreatedAtDesc(Long productId);

    @Query("SELECT r.sentimentLabel, COUNT(r) FROM Review r WHERE r.product.id = :productId AND r.sentimentLabel IS NOT NULL GROUP BY r.sentimentLabel")
    List<Object[]> countBySentimentLabel(@Param("productId") Long productId);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.product.id = :productId")
    Double averageRating(@Param("productId") Long productId);
}
