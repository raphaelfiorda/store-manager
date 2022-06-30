const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

const queryProducts = [[
  { id: 1, name: 'produto1' },
  { id: 2, name: 'produto2' },
  { id: 3, name: 'produto3' },
],
['metadata']];

describe('Testa a camada models de /products', () => {
  describe('Verifica a função #list', () => {
    it('Retorna a lista de produtos', async () => {
      sinon.stub(connection, 'execute').resolves(queryProducts);
      const productsResults = await productsModel.list();
      expect(productsResults).to.be.deep.equal(queryProducts[0]);
    })
  })
})