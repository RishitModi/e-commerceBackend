package com.modeiji.store.carts;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CartProductDto {
    private Long id;
    private String name;
    private String imageUrl;
    private BigDecimal price;
}
