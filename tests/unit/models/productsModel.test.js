const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../connection');
const productsModel = require('../../../models/productsModel');

const queryProducts = [[
  { id: 1, name: 'produto1' },
  { id: 2, name: 'produto2' },
  { id: 3, name: 'produto3' },
],
['metadata']];

describe('Testa a camada models de /products', () => {
  beforeEach(() => {
    sinon.restore();
  })

  describe('Verifica a função #list', () => {
    it('Retorna a lista de produtos', async () => {
      sinon.stub(connection, 'execute').resolves(queryProducts);
      const queryResult = await productsModel.list();
      expect(queryResult).to.be.deep.equal(queryProducts[0]);
    });
  });

  describe('Verifica a função #get', () => {
    it('Retorno o produto pelo id', async () => {
      sinon.stub(connection, 'execute').resolves(queryProducts);
      const queryResult = await productsModel.get();
      expect(queryResult).to.be.deep.equal(queryProducts[0][0]);
    });
  });

  describe('Verifica a função #exists', () => {
    it('Retorna a lista de produtos', async () => {
      sinon.stub(connection, 'execute').resolves(queryProducts);
      const queryResult = await productsModel.list();
      expect(queryResult).to.be.deep.equal(queryProducts[0]);
    });
  });
});