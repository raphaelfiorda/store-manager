const { Router } = require('express');
const salesController = require('../controllers/salesController');

const salesRoute = Router();

salesRoute.get('/', salesController.listSales);
salesRoute.get('/:id', salesController.getSale);
salesRoute.post('/', salesController.addSales);
salesRoute.delete('/:id', salesController.removeSale);
salesRoute.put('/:id', salesController.editSale)

module.exports = salesRoute;