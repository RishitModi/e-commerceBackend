package com.modeiji.store.mappers;

import com.modeiji.store.dtos.OrderDto;
import com.modeiji.store.entities.Order;
import org.mapstruct.Mapper;

    @Mapper(componentModel = "spring")
    public interface OrderMapper {
        OrderDto toDto(Order order);
    }
