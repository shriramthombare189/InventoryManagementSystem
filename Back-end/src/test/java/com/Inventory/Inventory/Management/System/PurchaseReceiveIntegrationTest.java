package com.Inventory.Inventory.Management.System;

import com.Inventory.Inventory.Management.System.model.*;
import com.Inventory.Inventory.Management.System.repository.*;
import com.Inventory.Inventory.Management.System.service.PurchaseService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@SpringBootTest
@ActiveProfiles("test")
public class PurchaseReceiveIntegrationTest {

    @Autowired
    ProductRepository productRepository;
    @Autowired
    PurchaseOrderRepository purchaseOrderRepository;
    @Autowired
    PurchaseItemRepository purchaseItemRepository;
    @Autowired
    StockBatchRepository stockBatchRepository;
    @Autowired
    PurchaseService purchaseService;

    @Test
    @Transactional
    public void testReceivePurchaseCreatesStockBatch() {
        // create product
        Product p = new Product();
        p.setName("Test Product");
        p.setSku("TP-001");
        productRepository.save(p);

        // create purchase order with one item
        PurchaseOrder po = new PurchaseOrder();
        po.setPoNumber("PO-TEST-1");
        PurchaseItem item = new PurchaseItem();
        item.setProduct(p);
        item.setQuantity(new BigDecimal("10"));
        item.setBatchNo("BATCH-1");
        item.setRate(new BigDecimal("5.0"));
        item.setPurchaseOrder(po);
        po.getItems().add(item);
        purchaseOrderRepository.save(po);

        // receive
        purchaseService.receivePurchase(po.getId());

        // assert stock batch created
        StockBatch sb = stockBatchRepository.findByProduct_IdAndBatchNo(p.getId(), "BATCH-1").orElseThrow();
        Assertions.assertEquals(0, sb.getQuantity().compareTo(new BigDecimal("10")));
    }
}
