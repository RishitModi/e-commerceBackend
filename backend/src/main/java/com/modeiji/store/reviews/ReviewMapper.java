package com.modeiji.store.reviews;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ReviewMapper {
    @Mapping(target = "productId", source = "product.id")
    @Mapping(target = "userName", source = "user.name")
    ReviewDto toDto(Review review);
}
