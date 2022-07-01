const { expect, use } = require('chai');
const { ValidationError } = require('joi');
const NotFoundError = require('../../../errors/NotFoundError');
const { beforeEach } = require('mocha');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

const productsController = require('../../../controllers/productsController');
const productsService = require('../../../services/productsService');

require('express-async-errors');

use(chaiAsPromised);

const queryProducts = [
  { id: 1, name: 'produto1' },
  { id: 2, name: 'produto2' },
  { id: 3, name: 'produto3' },
]

describe('Testa a camada controller de /products', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('Verifica a função #listProducts', () => {
    it('Se retorna o status e objeto esperado', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(productsService, 'list').resolves(queryProducts)

      await productsController.listProducts(req, res);

      expect(res.status.calledWith(200)).to.equals(true);
      expect(res.json.calledWith(queryProducts)).to.equals(true);
    });
  });

  describe('Verifica a função #getProduct', () => {
    it('Com id inválido, dispara um erro de validação', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 'string' };

      expect(productsController.getProduct(req, res))
        .to.be.rejectedWith(ValidationError);
    });

    it('Com id não encontrado, dispara erro não encontrado', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 1000 };

      expect(productsController.getProduct(req, res))
        .to.be.rejectedWith(NotFoundError);
    });

    it('Com id válido, retorna o status e objeto correto', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 1 };

      sinon.stub(productsService, 'checkIfExists').resolves(true);
      sinon.stub(productsService, 'get').resolves(queryProducts[0]);

      await productsController.getProduct(req, res);

      expect(res.status.calledWith(200)).to.equals(true);
      expect(res.json.calledWith(queryProducts[0])).to.equals(true);
    });
  });
});