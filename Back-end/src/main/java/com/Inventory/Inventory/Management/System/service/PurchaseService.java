package com.Inventory.Inventory.Management.System.service;

import com.Inventory.Inventory.Management.System.model.PurchaseItem;
import com.Inventory.Inventory.Management.System.model.PurchaseOrder;
import com.Inventory.Inventory.Management.System.model.StockBatch;
import com.Inventory.Inventory.Management.System.repository.PurchaseOrderRepository;
import com.Inventory.Inventory.Management.System.repository.StockBatchRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;

/**
 * Service to handle purchase order receiving and stock updates.
 */
@Service
public class PurchaseService {

    private final PurchaseOrderRepository purchaseOrderRepository;
    private final StockBatchRepository stockBatchRepository;

    public PurchaseService(PurchaseOrderRepository purchaseOrderRepository, StockBatchRepository stockBatchRepository) {
        this.purchaseOrderRepository = purchaseOrderRepository;
        this.stockBatchRepository = stockBatchRepository;
    }

    /**
     * Receive a purchase order: marks PO as RECEIVED and updates stock batches.
     */
    @Transactional
    public PurchaseOrder receivePurchase(Long purchaseOrderId) {
        PurchaseOrder po = purchaseOrderRepository.findById(purchaseOrderId).orElseThrow();
        // for each item, update or create stock batch
        for (PurchaseItem item : po.getItems()) {
            String batchNo = item.getBatchNo();
            Long productId = item.getProduct().getId();
            BigDecimal qty = item.getQuantity() != null ? item.getQuantity() : BigDecimal.ZERO;
            Optional<StockBatch> existing = stockBatchRepository.findByProduct_IdAndBatchNo(productId, batchNo == null ? "" : batchNo);
            if (existing.isPresent()) {
                StockBatch sb = existing.get();
                sb.setQuantity(sb.getQuantity().add(qty));
                stockBatchRepository.save(sb);
            } else {
                StockBatch sb = new StockBatch();
                sb.setProduct(item.getProduct());
                sb.setBatchNo(batchNo);
                sb.setExpiryDate(item.getExpiryDate());
                sb.setQuantity(qty);
                stockBatchRepository.save(sb);
            }
        }
        po.setStatus("RECEIVED");
        return purchaseOrderRepository.save(po);
    }
}
