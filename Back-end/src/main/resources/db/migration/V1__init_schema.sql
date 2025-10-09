-- Flyway baseline migration: initial schema for categories, units, products
-- This creates simple tables used by the initial scaffolding. Further migrations will add more tables.

CREATE TABLE IF NOT EXISTS category (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS unit (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(64) NOT NULL,
    name VARCHAR(128) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    sku VARCHAR(128) UNIQUE,
    name VARCHAR(512) NOT NULL,
    description TEXT,
    category_id BIGINT,
    unit_id BIGINT,
    cost_price DECIMAL(18,4) DEFAULT 0,
    selling_price DECIMAL(18,4) DEFAULT 0,
    tax_rate DECIMAL(5,2) DEFAULT 0,
    barcode VARCHAR(255),
    batch_no VARCHAR(255),
    expiry_date DATE,
    active BOOLEAN DEFAULT TRUE,
    attributes TEXT,
    image_path VARCHAR(1024),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_product_category FOREIGN KEY (category_id) REFERENCES category(id),
    CONSTRAINT fk_product_unit FOREIGN KEY (unit_id) REFERENCES unit(id)
);
