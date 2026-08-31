package com.modeiji.store.users;

import com.modeiji.store.auth.AuthService;
import com.modeiji.store.common.ErrorDto;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@RestController
@RequestMapping("/users/me/addresses")
public class AddressController {
    private final AuthService authService;
    private final AddressRepository addressRepository;
    private final AddressMapper addressMapper;
    private final UserRepository userRepository;

    @GetMapping
    public List<AddressDto> getAddresses() {
        var current = authService.getCurrentUser();
        return current.getAddresses().stream()
                .map(addressMapper::toDto)
                .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<AddressDto> createAddress(@RequestBody AddressDto dto) {
        var address = addressMapper.toEntity(dto);
        var current = authService.getCurrentUser();
        current.addAddress(address);
        var saved = addressRepository.save(address);
        return ResponseEntity.status(HttpStatus.CREATED).body(addressMapper.toDto(saved));
    }

    @PutMapping("/{id}")
    public AddressDto updateAddress(@PathVariable("id") Long id, @RequestBody AddressDto dto) {
        var address = addressRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        var current = authService.getCurrentUser();
        if (address.getUser() == null || !address.getUser().equals(current)) {
            throw new AccessDeniedException("You don't have access to this address.");
        }

        addressMapper.update(dto, address);
        var saved = addressRepository.save(address);
        return addressMapper.toDto(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAddress(@PathVariable("id") Long id) {
        var address = addressRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        var current = authService.getCurrentUser();
        if (address.getUser() == null || !address.getUser().equals(current)) {
            throw new AccessDeniedException("You don't have access to this address.");
        }

        current.removeAddress(address);
        userRepository.save(current);
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorDto> handleAccessDenied(Exception ex) {
        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(new ErrorDto(ex.getMessage()));
    }
}
