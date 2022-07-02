const connection = require('../connection');

const productsModel = {
  async list() {
    const sql = 'SELECT * FROM StoreManager.products';
    const [products] = await connection.execute(sql);
    return products;
  },

  async listByIdsArray(idsArray) {
      const sql = 'SELECT * FROM StoreManager.products WHERE id IN (?)';
      const [productsFound] = await connection.query(sql, [idsArray]);
      return productsFound;
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

  async add(name) {
    const sql = 'INSERT INTO StoreManager.products (name) VALUES (?)';
    const [{ insertId }] = await connection.execute(sql, [name]);
    return insertId;
  },
};

module.exports = productsModel;