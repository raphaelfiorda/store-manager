const connection = require('../connection');

const salesProductModel = {
  async bulkAddBySale(id, sale) {
    try {
      const sql = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
        VALUES ?`;
      const saleMap = sale.map((el) => [id, el.productId, el.quantity]);
      await connection.query(sql, [saleMap]);
    } catch (err) {
      console.log(err.message);
    }
  },

  async listBulkSaleAndProducts() {
    const sql = `SELECT SA.id, SA.date, SP.product_id, SP.quantity
    FROM StoreManager.sales AS SA
    INNER JOIN StoreManager.sales_products AS SP
    ON SA.id = SP.sale_id
    ORDER BY SA.id, SP.product_id;`;
    const [sales] = await connection.execute(sql);
    return sales;
  },

  async getBulkSaleAndProducts(id) {
    const sql = `SELECT SP.product_id, SP.quantity
    FROM StoreManager.sales AS SA
    INNER JOIN StoreManager.sales_products AS SP
    ON SA.id = SP.sale_id AND SA.id = ?
    ORDER BY SA.id, SP.product_id;`;
    const [sale] = await connection.execute(sql, [id]);
    return sale;
  },

  async edit(saleId, products) {
    const sql = `UPDATE StoreManager.sales_products
      SET quantity = ? WHERE sale_id = ? AND product_id = ?`;
    await products.forEach(({ productId, quantity }) =>
      connection.execute(sql, [quantity, saleId, productId]));
  },
};

module.exports = salesProductModel;