package com.modeiji.store.mappers;

import com.modeiji.store.dtos.RegisterUserRequest;
import com.modeiji.store.dtos.UpdateUserRequest;
import com.modeiji.store.dtos.UserDto;
import com.modeiji.store.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toDto(User user);
    User toEntity(RegisterUserRequest request);
    void update(UpdateUserRequest request, @MappingTarget User user);
}
