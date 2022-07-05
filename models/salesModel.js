const connection = require('../connection');

const salesModel = {
  async list() {
    const sql = 'SELECT * FROM StoreManager.sales_products';
    const [sales] = await connection.execute(sql);
    return sales;
  },

  async get(id) {
    const sql = `SELECT SA.id, SA.date, SP.product_id, SP.quantity
    FROM StoreManager.sales AS SA
    INNER JOIN StoreManager.sales_products AS SP
    ON SA.id = SP.sale_id AND SA.id = ?
    ORDER BY SA.id, SP.product_id;`;
    const [sale] = await connection.execute(sql, [id]);
    return sale;
  },

  async exists(id) {
    const sql = 'SELECT * FROM StoreManager.sales_products WHERE sale_id = ?';
    const [[exists]] = await connection.execute(sql, [id]);
    return !!exists;
  },

  async add() {
    const sql = 'INSERT INTO StoreManager.sales VALUES ()';
    const [{ insertId }] = await connection.execute(sql);
    return insertId;
  },

  async remove(id) {
    try {
      const sql = `DELETE SA, SP
      FROM StoreManager.sales AS SA
      INNER JOIN StoreManager.sales_products AS SP
      ON SA.id = SP.sale_id AND SA.id = ?`;
      await connection.execute(sql, [id]);
      return true;
    } catch (err) { console.log(err.message); }
  },
};

module.exports = salesModel;