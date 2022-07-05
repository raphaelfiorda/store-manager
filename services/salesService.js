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

  serializeBulk(data, id) {
    const { date, quantity } = data;
    if (id) {
      return {
        date,
        productId: data.product_id,
        quantity,
      };
    }
    const serializedBulk = {
      saleId: data.id,
      date,
      productId: data.product_id,
      quantity,
    };
    return serializedBulk;
  },

  async checkIfExists(id) {
    const exists = await salesModel.exists(id);
    if (!exists) {
      throw new NotFoundError('Sale not found');
    }
    return true;
  },

  async list() {
    const sales = await salesProductModel.listBulkSaleAndProducts();
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

  async remove(id) {
    await salesModel.remove(id);
    return true;
  },
};

module.exports = salesService;