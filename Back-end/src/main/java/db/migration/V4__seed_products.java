package db.migration;

import org.flywaydb.core.api.migration.BaseJavaMigration;
import org.flywaydb.core.api.migration.Context;

import java.math.BigDecimal;
import java.sql.PreparedStatement;

/**
 * Java-based Flyway migration to insert sample products (P0011..P0200).
 */
public class V4__seed_products extends BaseJavaMigration {

    @Override
    public void migrate(Context context) throws Exception {
        String sql = "INSERT INTO product (sku,name,description,category_id,unit_id,cost_price,selling_price,tax_rate,barcode,batch_no,expiry_date,active,attributes,image_path) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        try (PreparedStatement ps = context.getConnection().prepareStatement(sql)) {
            for (int i = 11; i <= 200; i++) {
                String sku = String.format("P%04d", i);
                String name = "Sample Product " + sku;
                String desc = "Auto-generated sample product";
                long categoryId = 1L;
                long unitId = 1L;
                BigDecimal cost = new BigDecimal("5.00").add(new BigDecimal(i).multiply(new BigDecimal("0.01")));
                BigDecimal sell = cost.multiply(new BigDecimal("1.25")).setScale(2, BigDecimal.ROUND_HALF_UP);
                BigDecimal tax = new BigDecimal("5.0");
                String barcode = "BC" + sku;
                String batch = "BATCH" + ((i - 1) % 5 + 1);

                ps.setString(1, sku);
                ps.setString(2, name);
                ps.setString(3, desc);
                ps.setLong(4, categoryId);
                ps.setLong(5, unitId);
                ps.setBigDecimal(6, cost);
                ps.setBigDecimal(7, sell);
                ps.setBigDecimal(8, tax);
                ps.setString(9, barcode);
                ps.setString(10, batch);
                ps.setNull(11, java.sql.Types.DATE);
                ps.setBoolean(12, true);
                ps.setString(13, "{}");
                ps.setNull(14, java.sql.Types.VARCHAR);
                ps.addBatch();
                if (i % 50 == 0) {
                    ps.executeBatch();
                }
            }
            ps.executeBatch();
        }
    }
}
