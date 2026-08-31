package com.modeiji.store.products;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@AllArgsConstructor
@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final CategoryRepository categoryRepository;
    private final PexelsImageService pexelsImageService;

    @GetMapping
    public List<ProductDto> getAllProducts(
        @RequestParam(name = "categoryId", required = false) Byte categoryId
    ) {
        List<Product> products;
        if (categoryId != null) {
            products = productRepository.findByCategoryId(categoryId);
        } else {
            products = productRepository.findAllWithCategory();
        }

        products = products.stream()
            .map(product -> pexelsImageService.ensureImageUrl(product, productRepository))
            .toList();

        return products.stream().map(productMapper::toDto).toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProduct(@PathVariable Long id) {
        var product = productRepository.findById(id).orElse(null);
        if (product == null) {
            return ResponseEntity.notFound().build();
        }
        product = pexelsImageService.ensureImageUrl(product, productRepository);
        return ResponseEntity.ok(productMapper.toDto(product));
    }

    @PostMapping
    public ResponseEntity<ProductDto> createProduct(
        @RequestBody ProductDto productDto,
        UriComponentsBuilder uriBuilder) {
        var category = categoryRepository.findById(productDto.getCategoryId()).orElse(null);
        if (category == null) {
            return ResponseEntity.badRequest().build();
        }

        var product = productMapper.toEntity(productDto);
        product.setCategory(category);
        product = pexelsImageService.ensureImageUrl(product, productRepository);
        productRepository.save(product);
        productDto.setId(product.getId());

        var uri = uriBuilder.path("/products/{id}").buildAndExpand(productDto.getId()).toUri();

        return ResponseEntity.created(uri).body(productDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDto> updateProduct(
        @PathVariable Long id,
        @RequestBody ProductDto productDto) {
        var category = categoryRepository.findById(productDto.getCategoryId()).orElse(null);
        if (category == null) {
            return ResponseEntity.badRequest().build();
        }

        var product = productRepository.findById(id).orElse(null);
        if (product == null) {
            return ResponseEntity.notFound().build();
        }

        productMapper.update(productDto, product);
        product.setCategory(category);
        productRepository.save(product);
        productDto.setId(product.getId());

        return ResponseEntity.ok(productDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        var product = productRepository.findById(id).orElse(null);
        if (product == null) {
            return ResponseEntity.notFound().build();
        }

        productRepository.delete(product);

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/image")
    public ResponseEntity<?> fetchAndSaveProductImage(@PathVariable Long id) {
        var product = productRepository.findById(id).orElse(null);
        if (product == null) {
            return ResponseEntity.notFound().build();
        }

        var imageUrl = pexelsImageService.findImageUrl(product.getName());
        if (imageUrl.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("No image found for product");
        }

        product.setImageUrl(imageUrl.get());
        productRepository.save(product);
        return ResponseEntity.ok(productMapper.toDto(product));
    }

    @PostMapping("/backfill-images")
    public Map<String, Integer> backfillProductImages() {
        var products = productRepository.findAll();
        int checked = 0;
        int updated = 0;
        int noMatch = 0;

        for (var product : products) {
            if (product.getImageUrl() != null && !product.getImageUrl().isBlank()) {
                continue;
            }

            checked++;
            var imageUrl = pexelsImageService.findImageUrl(product.getName());
            if (imageUrl.isPresent()) {
                product.setImageUrl(imageUrl.get());
                productRepository.save(product);
                updated++;
            } else {
                noMatch++;
            }
        }

        var summary = new LinkedHashMap<String, Integer>();
        summary.put("checked", checked);
        summary.put("updated", updated);
        summary.put("noMatch", noMatch);
        return summary;
    }
}
