package com.Inventory.Inventory.Management.System.controller;

import com.Inventory.Inventory.Management.System.model.Category;
import com.Inventory.Inventory.Management.System.service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<Category> list() { return categoryService.listAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Category> get(@PathVariable Long id) {
        return categoryService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Category> create(@RequestBody Category c) {
        Category saved = categoryService.save(c);
        return ResponseEntity.created(URI.create("/api/categories/" + saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> update(@PathVariable Long id, @RequestBody Category c) {
        return categoryService.findById(id).map(existing -> {
            existing.setName(c.getName());
            existing.setDescription(c.getDescription());
            Category saved = categoryService.save(existing);
            return ResponseEntity.ok(saved);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        categoryService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
