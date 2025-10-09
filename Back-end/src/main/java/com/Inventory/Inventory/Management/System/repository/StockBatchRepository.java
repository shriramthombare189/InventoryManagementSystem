package com.Inventory.Inventory.Management.System.repository;

import com.Inventory.Inventory.Management.System.model.StockBatch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StockBatchRepository extends JpaRepository<StockBatch, Long> {
    Optional<StockBatch> findByProduct_IdAndBatchNo(Long productId, String batchNo);
}
