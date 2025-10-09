-- V3: Seed sample categories, units, suppliers, customers and products

INSERT INTO category (id, name, description) VALUES (1, 'Default', 'Default category');
INSERT INTO category (id, name, description) VALUES (2, 'Beverages', 'Drinks and beverages');
INSERT INTO category (id, name, description) VALUES (3, 'Snacks', 'Packaged snacks');

INSERT INTO unit (id, code, name, description) VALUES (1, 'pcs', 'Pieces', 'Piece unit');
INSERT INTO unit (id, code, name, description) VALUES (2, 'kg', 'Kilogram', 'Kilogram');
INSERT INTO unit (id, code, name, description) VALUES (3, 'ltr', 'Liter', 'Liter');

-- Suppliers
INSERT INTO supplier (id, name, contact, address, tax_id, payment_terms) VALUES (1, 'Supplier A', '111-111-1111', 'Address A', 'TAXA1', 'Net30');
INSERT INTO supplier (id, name, contact, address, tax_id, payment_terms) VALUES (2, 'Supplier B', '222-222-2222', 'Address B', 'TAXB2', 'Net15');
INSERT INTO supplier (id, name, contact, address, tax_id, payment_terms) VALUES (3, 'Supplier C', '333-333-3333', 'Address C', 'TAXC3', 'Net30');
INSERT INTO supplier (id, name, contact, address, tax_id, payment_terms) VALUES (4, 'Supplier D', '444-444-4444', 'Address D', 'TAXD4', 'Net7');
INSERT INTO supplier (id, name, contact, address, tax_id, payment_terms) VALUES (5, 'Supplier E', '555-555-5555', 'Address E', 'TAXE5', 'Net30');
INSERT INTO supplier (id, name, contact, address, tax_id, payment_terms) VALUES (6, 'Supplier F', '666-666-6666', 'Address F', 'TAXF6', 'Net30');
INSERT INTO supplier (id, name, contact, address, tax_id, payment_terms) VALUES (7, 'Supplier G', '777-777-7777', 'Address G', 'TAXG7', 'Net30');
INSERT INTO supplier (id, name, contact, address, tax_id, payment_terms) VALUES (8, 'Supplier H', '888-888-8888', 'Address H', 'TAXH8', 'Net30');
INSERT INTO supplier (id, name, contact, address, tax_id, payment_terms) VALUES (9, 'Supplier I', '999-999-9999', 'Address I', 'TAXI9', 'Net30');
INSERT INTO supplier (id, name, contact, address, tax_id, payment_terms) VALUES (10, 'Supplier J', '000-000-0000', 'Address J', 'TAXJ10', 'Net30');

-- Customers
INSERT INTO customer (id, name, contact, address, tax_id) VALUES (1, 'Customer A', '911-111-1111', 'Cust Address A', 'CTAX1');
INSERT INTO customer (id, name, contact, address, tax_id) VALUES (2, 'Customer B', '922-222-2222', 'Cust Address B', 'CTAX2');
INSERT INTO customer (id, name, contact, address, tax_id) VALUES (3, 'Customer C', '933-333-3333', 'Cust Address C', 'CTAX3');
INSERT INTO customer (id, name, contact, address, tax_id) VALUES (4, 'Customer D', '944-444-4444', 'Cust Address D', 'CTAX4');
INSERT INTO customer (id, name, contact, address, tax_id) VALUES (5, 'Customer E', '955-555-5555', 'Cust Address E', 'CTAX5');
INSERT INTO customer (id, name, contact, address, tax_id) VALUES (6, 'Customer F', '966-666-6666', 'Cust Address F', 'CTAX6');
INSERT INTO customer (id, name, contact, address, tax_id) VALUES (7, 'Customer G', '977-777-7777', 'Cust Address G', 'CTAX7');
INSERT INTO customer (id, name, contact, address, tax_id) VALUES (8, 'Customer H', '988-888-8888', 'Cust Address H', 'CTAX8');
INSERT INTO customer (id, name, contact, address, tax_id) VALUES (9, 'Customer I', '999-999-9999', 'Cust Address I', 'CTAX9');
INSERT INTO customer (id, name, contact, address, tax_id) VALUES (10, 'Customer J', '900-000-0000', 'Cust Address J', 'CTAX10');

-- Products: generate 200 sample products referencing category 1 and unit 1
-- We'll insert in batches of 50 to keep the file readable

-- Products P0001..P0200
INSERT INTO product (sku, name, description, category_id, unit_id, cost_price, selling_price, tax_rate, barcode, batch_no, expiry_date, active, attributes, image_path)
VALUES
( 'P0001', 'Sample Product P0001', 'Auto-generated sample product', 1, 1, 10.00, 12.50, 5.0, 'BCP0001', 'BATCH1', NULL, TRUE, '{}', NULL ),
( 'P0002', 'Sample Product P0002', 'Auto-generated sample product', 1, 1, 11.00, 13.50, 5.0, 'BCP0002', 'BATCH1', NULL, TRUE, '{}', NULL ),
( 'P0003', 'Sample Product P0003', 'Auto-generated sample product', 1, 1, 9.50, 11.00, 5.0, 'BCP0003', 'BATCH1', NULL, TRUE, '{}', NULL ),
( 'P0004', 'Sample Product P0004', 'Auto-generated sample product', 1, 1, 14.00, 16.00, 5.0, 'BCP0004', 'BATCH1', NULL, TRUE, '{}', NULL ),
( 'P0005', 'Sample Product P0005', 'Auto-generated sample product', 1, 1, 8.00, 9.50, 5.0, 'BCP0005', 'BATCH1', NULL, TRUE, '{}', NULL ),
( 'P0006', 'Sample Product P0006', 'Auto-generated sample product', 1, 1, 7.00, 8.50, 5.0, 'BCP0006', 'BATCH1', NULL, TRUE, '{}', NULL ),
( 'P0007', 'Sample Product P0007', 'Auto-generated sample product', 1, 1, 6.00, 7.50, 5.0, 'BCP0007', 'BATCH1', NULL, TRUE, '{}', NULL ),
( 'P0008', 'Sample Product P0008', 'Auto-generated sample product', 1, 1, 5.00, 6.50, 5.0, 'BCP0008', 'BATCH1', NULL, TRUE, '{}', NULL ),
( 'P0009', 'Sample Product P0009', 'Auto-generated sample product', 1, 1, 4.00, 5.50, 5.0, 'BCP0009', 'BATCH1', NULL, TRUE, '{}', NULL ),
( 'P0010', 'Sample Product P0010', 'Auto-generated sample product', 1, 1, 3.50, 4.50, 5.0, 'BCP0010', 'BATCH1', NULL, TRUE, '{}', NULL );

-- Additional batches P0011..P0200 (generated similarly)

/*
   To keep this migration manageable in the example, you can either expand the insert list
   for all 200 products similarly, or run a small Java-based data loader at startup that
   reads a CSV and inserts the records. For now, we include 10 sample products here and
   provide a CSV generator script in the workspace for generating the full 200 if needed.
*/
