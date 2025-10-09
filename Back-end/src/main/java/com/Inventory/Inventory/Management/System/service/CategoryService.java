package com.Inventory.Inventory.Management.System.service;

import com.Inventory.Inventory.Management.System.model.Category;
import com.Inventory.Inventory.Management.System.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> listAll() { return categoryRepository.findAll(); }
    public Optional<Category> findById(Long id) { return categoryRepository.findById(id); }
    public Category save(Category c) { return categoryRepository.save(c); }
    public void delete(Long id) { categoryRepository.deleteById(id); }
}
