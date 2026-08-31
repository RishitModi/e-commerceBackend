package com.modeiji.store.products;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PexelsImageService {
    private final String apiKey;
    private final RestClient restClient;

    public PexelsImageService(@Value("${pexels.apiKey}") String apiKey) {
        this.apiKey = apiKey;
        this.restClient = RestClient.create();
    }

    public Optional<String> findImageUrl(String query) {
        try {
            Map<String, Object> response = restClient.get()
                .uri("https://api.pexels.com/v1/search?query={query}&per_page=1", query)
                .header("Authorization", apiKey)
                .retrieve()
                .body(Map.class);

            if (response == null) {
                return Optional.empty();
            }

            Object photosObject = response.get("photos");
            if (!(photosObject instanceof List<?> photos) || photos.isEmpty()) {
                return Optional.empty();
            }

            Object firstPhoto = photos.get(0);
            if (!(firstPhoto instanceof Map<?, ?> firstPhotoMap)) {
                return Optional.empty();
            }

            Object srcObject = firstPhotoMap.get("src");
            if (!(srcObject instanceof Map<?, ?> srcMap)) {
                return Optional.empty();
            }

            Object mediumObject = srcMap.get("medium");
            if (!(mediumObject instanceof String mediumUrl) || mediumUrl.isBlank()) {
                return Optional.empty();
            }

            return Optional.of(mediumUrl);
        } catch (Exception ex) {
            return Optional.empty();
        }
    }

    public Product ensureImageUrl(Product product, ProductRepository productRepository) {
        if (product.getImageUrl() != null && !product.getImageUrl().isBlank()) {
            return product;
        }

        var imageUrl = findImageUrl(product.getName());
        if (imageUrl.isPresent()) {
            product.setImageUrl(imageUrl.get());
            return productRepository.save(product);
        }

        return product;
    }
}
