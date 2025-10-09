package com.Inventory.Inventory.Management.System.repository;

import com.Inventory.Inventory.Management.System.model.PurchaseItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchaseItemRepository extends JpaRepository<PurchaseItem, Long> {
}
