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

  async remove(id) {
    const sql = 'DELETE FROM StoreManager.products WHERE id = ?';
    await connection.query(sql, [id]);
  },

  async add(name) {
    const sql = 'INSERT INTO StoreManager.products (name) VALUES (?)';
    const [{ insertId }] = await connection.execute(sql, [name]);
    return insertId;
  },

  async edit(id, name) {
    const sql = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
    const [{ affectedRows }] = await connection.execute(sql, [name, id]);
    return affectedRows;
  },
};

module.exports = productsModel;