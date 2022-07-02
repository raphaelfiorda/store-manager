const connection = require('../connection');

const salesModel = {
  async list() {
    const sql = 'SELECT * FROM StoreManager.sales_products';
    const [sales] = await connection.execute(sql);
    return sales;
  },

  async get(id) {
    const sql = 'SELECT * FROM StoreManager.sales_products WHERE sale_id = ?';
    const [sale] = await connection.execute(sql, [id]);
    return sale;
  },

  // async exists(id) {
  //   const sql = 'SELECT * FROM StoreManager.products WHERE id = ?';
  //   const [[exists]] = await connection.execute(sql, [id]);
  //   return !!exists;
  // },

  async add() {
    const sql = 'INSERT INTO StoreManager.sales VALUES ()';
    const [{ insertId }] = await connection.execute(sql);
    return insertId;
  },
};

module.exports = salesModel;