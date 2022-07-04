const productsService = require('../services/productsService');

const productsController = {
  async addProduct(req, res) {
    const { name } = await productsService.validateBody(req.body);
    const id = await productsService.add(name);
    const product = await productsService.get(id);
    res.status(201).json(product);
  },
  
  async listProducts(_req, res) {
    const products = await productsService.list();
    res.status(200).json(products);
  },

  async removeProduct(req, res) {
    const { id } = await productsService.validateParamsId(req.params);
    await productsService.checkIfExists(id);
    await productsService.remove(id);
    res.status(204).json({ ok: true });
  },

  async getProduct(req, res) {
    const { id } = await productsService.validateParamsId(req.params);
    await productsService.checkIfExists(id);
    const product = await productsService.get(id);
    res.status(200).json(product);
  },

  async editProduct(req, res) {
    const [{ id }, { name }] = await Promise.all([
      productsService.validateParamsId(req.params),
      productsService.validateBody(req.body),
    ]);
    await productsService.checkIfExists(id);
    await productsService.edit(id, name);
    const productEdited = await productsService.get(id);
    res.status(200).json(productEdited);
  },

};

module.exports = productsController;