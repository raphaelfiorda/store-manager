const { Router } = require('express');
const productsController = require('../controllers/productsController');

const productsRoute = Router();

productsRoute.get('/', productsController.listProducts);
productsRoute.get('/:id', productsController.getProduct);
productsRoute.post('/', productsController.addProduct);
productsRoute.put('/:id', productsController.editProduct);
productsRoute.delete('/:id', productsController.removeProduct);

module.exports = productsRoute;