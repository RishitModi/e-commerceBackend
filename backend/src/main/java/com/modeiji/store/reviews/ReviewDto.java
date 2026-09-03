package com.modeiji.store.reviews;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ReviewDto {
    private Long id;
    private Long productId;
    private String userName;
    private Integer rating;
    private String comment;
    private String sentimentLabel;
    private BigDecimal sentimentScore;
    private LocalDateTime createdAt;
}
