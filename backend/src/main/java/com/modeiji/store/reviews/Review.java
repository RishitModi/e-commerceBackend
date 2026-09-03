package com.modeiji.store.reviews;

import com.modeiji.store.products.Product;
import com.modeiji.store.users.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private Integer rating;

    private String comment;

    @Column(name = "sentiment_label")
    private String sentimentLabel;

    @Column(name = "sentiment_score")
    private BigDecimal sentimentScore;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;
}
