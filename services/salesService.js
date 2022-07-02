const Joi = require('joi');
const runSchema = require('./schemaValidator');
const salesModel = require('../models/salesModel');
const salesProductModel = require('../models/salesProductModel');
const NotFoundError = require('../errors/NotFoundError');

const salesService = {
  validateParamsId: runSchema(Joi.object({
    id: Joi.number().required().integer().positive(),
  })),

  validateBody: runSchema(Joi.object({
    productId: Joi.number().required().integer().positive(),
    quantity: Joi.number().required().integer().min(1),
  })),

  serialize(data) {
    const serializedData = {
      productId: data.product_id,
      quantity: data.quantity,
    };
    return serializedData;
  },

  async checkIfExists(id) {
    const exists = await salesModel.exists(id);
    if (!exists) {
      throw new NotFoundError('Sale not found');
    }
    return true;
  },

  async list() {
    const sales = await salesModel.list();
    return sales;
  },

  async get(id) {
    const sale = await salesModel.get(id);
    return sale;
  },

  async add(sale) {
    const id = await salesModel.add();
    await salesProductModel.bulkAddBySale(id, sale);
    return id;
  },
};

module.exports = salesService;