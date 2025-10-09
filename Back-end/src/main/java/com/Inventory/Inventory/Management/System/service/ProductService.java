package com.Inventory.Inventory.Management.System.service;

import com.Inventory.Inventory.Management.System.model.Product;
import com.Inventory.Inventory.Management.System.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> listAll() { return productRepository.findAll(); }
    public Optional<Product> findById(Long id) { return productRepository.findById(id); }
    public Product save(Product p) { return productRepository.save(p); }
    public void delete(Long id) { productRepository.deleteById(id); }
    public List<Product> searchByName(String q) { return productRepository.findByNameContainingIgnoreCase(q); }
    public List<Product> findBySku(String sku) { return productRepository.findBySku(sku); }
    public List<Product> findByBarcode(String barcode) { return productRepository.findByBarcode(barcode); }

    public String saveImage(MultipartFile file, Long productId) throws IOException {
        if (file == null || file.isEmpty()) return null;
        String imagesDir = "data/images";
        Path dirPath = Paths.get(imagesDir);
        if (!Files.exists(dirPath)) Files.createDirectories(dirPath);
        String original = file.getOriginalFilename();
        String ext = "";
        if (original != null && original.contains(".")) {
            ext = original.substring(original.lastIndexOf('.'));
        }
        String filename = String.format("p%d-%d%s", productId == null ? 0 : productId, Instant.now().toEpochMilli(), ext);
        Path dest = dirPath.resolve(filename);
        Files.copy(file.getInputStream(), dest);
        // update product imagePath
        if (productId != null) {
            productRepository.findById(productId).ifPresent(p -> {
                p.setImagePath("/images/" + filename);
                productRepository.save(p);
            });
        }
        return "/images/" + filename;
    }
}
