package com.Inventory.Inventory.Management.System.repository;

import com.Inventory.Inventory.Management.System.model.PurchaseOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Long> {
    PurchaseOrder findByPoNumber(String poNumber);
}
