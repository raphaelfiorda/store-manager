const productsService = require('../services/productsService');

const productsController = {
  async listProducts(_req, res) {
    const products = await productsService.list();
    res.status(200).json(products);
  },

  async getProduct(req, res) {
    const { id } = await productsService.validateParamsId(req.params);
    await productsService.checkIfExists(id);
    const product = await productsService.get(id);
    res.status(200).json(product);
  }
};

module.exports = productsController;