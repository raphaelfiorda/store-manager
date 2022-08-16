const salesService = require('../services/salesService');
const productsService = require('../services/productsService');

const salesController = {
  async addSales(req, res) {
    const sale = [...req.body];
    const idsArray = sale.map((el) => el.productId);
    sale.forEach((el) => salesService.validateBody(el));
    await productsService.checkIfExistsByIdsArray(idsArray);
    const id = await salesService.add(sale);
    const addedSale = await salesService.get(id);
    const serialize = addedSale.map(salesService.serialize);
    const response = { id, itemsSold: serialize };
    res.status(201).json(response);
  },

  async listSales(_req, res) {
    const sales = await salesService.list();
    const serializedResult = sales.map((el) => salesService.serializeBulk(el, null));
    res.status(200).json(serializedResult);
  },

  async getSale(req, res) {
    const { id } = await salesService.validateParamsId(req.params);
    await salesService.checkIfExists(id);
    const sale = await salesService.get(id);
    const serializedResult = sale
      .map((el) => salesService.serializeBulk(el, id));
    res.status(200).json(serializedResult);
  },

  async removeSale(req, res) {
    const { id } = await salesService.validateParamsId(req.params);
    await salesService.checkIfExists(id);
    await salesService.remove(id);
    res.status(204).json({ ok: true });
  },

  async editSale(req, res) {
    const { id } = await salesService.validateParamsId(req.params);
    const products = req.body;
    await products.forEach((el) => salesService.validateBody(el));
    const productIds = products.map((el) => el.productId);
    await productsService.checkIfExistsByIdsArray(productIds);
    await salesService.checkIfExists(id);
    await salesService.edit(id, products);
    const saleEdited = await salesService.getBulkSaleAndProducts(id);
    res.status(200).json({
      saleId: id,
      itemsUpdated: saleEdited.map((el) => salesService.serialize(el)),
    });
  },
};

module.exports = salesController;