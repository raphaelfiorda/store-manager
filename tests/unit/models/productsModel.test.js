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

  describe('Verifica a função #listByIdsArray', () => {
    it('Retorna true quando o produto é removido', async () => {
      const testFilter = queryProducts[0].filter((el) => el.id !== 1);
      sinon.stub(connection, 'query').resolves([testFilter, []]);
      const queryResult = await productsModel.listByIdsArray([2, 3]);
      expect(queryResult).to.equals(testFilter);
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
    it('Retorna true', async () => {
      sinon.stub(connection, 'execute').resolves(queryProducts);
      const queryResult = await productsModel.list();
      expect(queryResult).to.be.deep.equal(queryProducts[0]);
    });
  });

  describe('Verifica a função #add', () => {
    it('Retorna o id do produto adicionado', async () => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 2}, {}]);
      const queryResult = await productsModel.add({ name: 'Teste' });
      expect(queryResult).to.equals(2);
    });
  });

  describe('Verifica a função #edit', () => {
    it('Retorna o id do produto editado', async () => {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 2 }, {}]);
      const queryResult = await productsModel.edit({ id: 2, name: 'Teste' });
      expect(queryResult).to.equals(2);
    });
  });

  describe('Verifica a função #remove', () => {
    it('Retorna true quando o produto é removido', async () => {
      sinon.stub(connection, 'execute').resolves(true);
      const queryResult = await productsModel.remove({ id: 2 });
      expect(queryResult).to.equals(true);
    });
  });
});