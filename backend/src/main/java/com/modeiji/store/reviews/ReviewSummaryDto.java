package com.modeiji.store.reviews;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Map;

@Data
@AllArgsConstructor
public class ReviewSummaryDto {
    private long totalReviews;
    private Double averageRating;
    private Map<String, Long> sentimentCounts;
}
