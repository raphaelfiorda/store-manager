const connection = require('./connection');

const productsModel = {
  async list() {
    const sql = 'SELECT * FROM StoreManager.products';
    const [products] = await connection.execute(sql);
    return products;
  },

  async get(id) {
    const sql = 'SELECT * FROM StoreManager.products WHERE id = ?';
    const [[product]] = await connection.execute(sql, [id]);
    return product;
  },

  async exists(id) {
    const sql = 'SELECT * FROM StoreManager.products WHERE id = ?';
    const [[exists]] = await connection.execute(sql, [id]);
    return !!exists;
  },
};

module.exports = productsModel;