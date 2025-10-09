package com.Inventory.Inventory.Management.System.controller;

import com.Inventory.Inventory.Management.System.model.Product;
import com.Inventory.Inventory.Management.System.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> list(@RequestParam(value = "q", required = false) String q) {
        if (q != null && !q.isEmpty()) return productService.searchByName(q);
        return productService.listAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> get(@PathVariable Long id) {
        return productService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Product> create(@RequestBody Product p) {
        Product saved = productService.save(p);
        return ResponseEntity.created(URI.create("/api/products/" + saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> update(@PathVariable Long id, @RequestBody Product p) {
        return productService.findById(id).map(existing -> {
            existing.setName(p.getName());
            existing.setSku(p.getSku());
            existing.setDescription(p.getDescription());
            existing.setBarcode(p.getBarcode());
            existing.setActive(p.getActive());
            existing.setCostPrice(p.getCostPrice());
            existing.setSellingPrice(p.getSellingPrice());
            existing.setTaxRate(p.getTaxRate());
            existing.setBatchNo(p.getBatchNo());
            existing.setExpiryDate(p.getExpiryDate());
            existing.setAttributes(p.getAttributes());
            existing.setImagePath(p.getImagePath());
            existing.setCategory(p.getCategory());
            existing.setUnit(p.getUnit());
            Product saved = productService.save(existing);
            return ResponseEntity.ok(saved);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/image")
    public ResponseEntity<?> uploadImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            String path = productService.saveImage(file, id);
            return ResponseEntity.ok().body(path);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to save image");
        }
    }
}
