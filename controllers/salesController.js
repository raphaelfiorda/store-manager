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
    res.status(200).json(sales);
  },

  async getSale(req, res) {
    const { id } = await salesService.validateParamsId(req.params);
    await salesService.checkIfExists(id);
    const sale = await salesService.get(id);
    res.status(200).json(sale);
  },
};

module.exports = salesController;