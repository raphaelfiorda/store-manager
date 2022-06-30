const { expect, use } = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');

const productsService = require('../../../services/productsService');
const productsModel = require('../../../models/productsModel');
const NotFoundError = require('../../../errors/NotFoundError');
const { beforeEach } = require('mocha');

use(chaiAsPromised);

const VALID_ID = 1;
const INVALID_ID = '1d5g';
const NOT_FOUND_ID = 2000;
const queryProducts = [
  { id: 1, name: 'produto1' },
  { id: 2, name: 'produto2' },
  { id: 3, name: 'produto3' }];

describe('Testa a camada service de /products', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('Verifica a função #checkIfExists', () => {
    it('Com paramsId válido, retorna true', async () => {
      sinon.stub(productsModel, 'exists').resolves(true);
      const exists = await productsService.checkIfExists(VALID_ID);
      expect(exists).to.equals(true);
    });

    it('Com paramsId inválido, dispara um erro', async () => {
      sinon.stub(productsModel, 'exists').resolves(false);
      expect(productsService.checkIfExists(NOT_FOUND_ID))
        .to.be.rejectedWith(NotFoundError);
    })
  });

  describe('Verifica a validador #validateParamsId', () => {
    it('Com um id válido, retorna o mesmo id passado', () => {
      const validatedId = productsService.validateParamsId({ id: VALID_ID });
      expect(validatedId).to.deep.equals({ id: 1 });
    });

    it('Com um id inválido, dispara um erro', () => {
      expect(() => productsService.validateParamsId({ id: INVALID_ID }))
        .to.throws('"id" must be a number');
      
      expect(() => productsService.validateParamsId({ id: -1 }))
        .to.throws('"id" must be a positive number');
    });
  });

  describe('Verifica a função #list', () => {
    it('Com um query bem-sucedida, retorna o resultado correto', async () => {
      sinon.stub(productsModel, 'list').resolves(queryProducts);
      const productsResults = await productsService.list();
      expect(productsResults).to.deep.equals(queryProducts);
    });

    it('Com um query vazia, retorna um array vazio', async () => {
      sinon.stub(productsModel, 'list').resolves([]);
      const productsResults = await productsService.list();
      expect(productsResults).to.deep.equals([]);
    });
  });

  describe('Verifica a função #get', () => {
    it('Com o id localizado, retorna o objeto correto', async () => {
      sinon.stub(productsModel, 'get').resolves(queryProducts[0]);
      const resultById = await productsService.get(1);
      expect(resultById).to.deep.equals(queryProducts[0]);
    });
  });
});