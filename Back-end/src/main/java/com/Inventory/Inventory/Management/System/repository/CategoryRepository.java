package com.Inventory.Inventory.Management.System.repository;

import com.Inventory.Inventory.Management.System.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
