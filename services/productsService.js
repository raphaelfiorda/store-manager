const Joi = require('joi');
const runSchema = require('./schemaValidator');
const productsModel = require('../models/productsModel');
const NotFoundError = require('../errors/NotFoundError');

const productsService = {
  validateParamsId: runSchema(Joi.object({
    id: Joi.number().required().integer().positive(),
  })),

  validateBody: runSchema(Joi.object({
    name: Joi.string().required().min(5),
  })),

  async checkIfExists(id) {
    const exists = await productsModel.exists(id);
    if (!exists) {
      throw new NotFoundError('Product not found');
    }
    return true;
  },

  async checkIfExistsByIdsArray(idsArray) {
    const productsFound = await productsModel.listByIdsArray(idsArray);

    if (!productsFound.length) throw new NotFoundError('Product not found');

    if (productsFound.length !== idsArray.length) {
      throw new NotFoundError('Product not found');
    }
  },

  async list() {
    const products = await productsModel.list();
    return products;
  },

  async remove(id) {
    await productsModel.remove(id);
  },

  async get(id) {
    const product = await productsModel.get(id);
    return product;
  },

  async add(name) {
    const product = await productsModel.add(name);
    return product;
  },

  async edit(id, name) {
    const { affectedId } = await productsModel.edit(id, name);
    return affectedId;
  },

  async search(q) {
    const products = await productsModel.search(q);
    return products;
  },
};

module.exports = productsService;