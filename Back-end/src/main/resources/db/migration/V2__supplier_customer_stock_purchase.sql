-- Migration V2: Suppliers, Customers, Stock batches, Purchase orders

CREATE TABLE IF NOT EXISTS supplier (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(512) NOT NULL,
    contact VARCHAR(255),
    address TEXT,
    tax_id VARCHAR(128),
    payment_terms VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS customer (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(512) NOT NULL,
    contact VARCHAR(255),
    address TEXT,
    tax_id VARCHAR(128),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS stock_batch (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_id BIGINT NOT NULL,
    batch_no VARCHAR(255),
    expiry_date DATE,
    quantity DECIMAL(18,4) DEFAULT 0,
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_stock_product FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE IF NOT EXISTS purchase_order (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    po_number VARCHAR(128) UNIQUE,
    supplier_id BIGINT,
    status VARCHAR(32) DEFAULT 'DRAFT',
    expected_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_po_supplier FOREIGN KEY (supplier_id) REFERENCES supplier(id)
);

CREATE TABLE IF NOT EXISTS purchase_item (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    purchase_order_id BIGINT,
    product_id BIGINT,
    quantity DECIMAL(18,4) DEFAULT 0,
    rate DECIMAL(18,4) DEFAULT 0,
    batch_no VARCHAR(255),
    expiry_date DATE,
    CONSTRAINT fk_pi_po FOREIGN KEY (purchase_order_id) REFERENCES purchase_order(id),
    CONSTRAINT fk_pi_product FOREIGN KEY (product_id) REFERENCES product(id)
);
