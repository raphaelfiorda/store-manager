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

  // async list() {
  //   const sql = 'SELECT * FROM StoreManager.sales_products';
  //   const [sales] = await connection.execute(sql);
  //   return sales;
  // },

  // // async get(id) {
  // //   const sql = 'SELECT * FROM StoreManager.products WHERE id = ?';
  // //   const [[product]] = await connection.execute(sql, [id]);
  // //   return product;
  // // },

  // // async exists(id) {
  // //   const sql = 'SELECT * FROM StoreManager.products WHERE id = ?';
  // //   const [[exists]] = await connection.execute(sql, [id]);
  // //   return !!exists;
  // // },

};

module.exports = salesProductModel;