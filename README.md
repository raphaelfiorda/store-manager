# Store Manager!

#### Uma aplicação construída como um sistema de gerenciamento de vendas *dropshipping* com suporte de um banco de dados para gestão das entidades.
---

## Tecnologias

Esse projeto foi uma oportunidade de consolidar habilidades em:

- **Node.js** com Express
- Arquitetura **MSC** (*model-service-controller*)
- **RESTful** API
  
---
## Rodando a aplicação

1. Inicie instalando as dependências `npm install`

2. Para o uso com Docker:
      - Rode os serviços com `docker-compose up -d build`
      - Acesso o terminal integrado com `docker exec -ti talker_manager bash`
      - Instale a partir de lá as dependências `npm install`

3. Configure as variáveis de ambiente, especialmente a porta para utilização do banco de dados

---

## Diagrama Entidade Relacionamento

![Diagrama do banco de dados](/utils/Store%20Manager%20DER.png)

---
## Rotas

A aplicação dá suporte para as rotas 
[`/products`](/routes/productsRoute.js) e 
[`/sales`](/routes/salesRoute.js)



![Imagem com as rotas](/utils/store_manager_methods.png)
