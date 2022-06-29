const express = require('express');
require('express-async-errors');
const productsRoute = require('./routes/productsRoute');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRoute);

app.use((err, _req, res, _next) => {
  const { name, message } = err;
  switch (name) {
    case 'NotFoundError':
      res.status(404).json({ message }); break;
    case 'ValidationError':
      res.status(400).json({ message }); break;
    default: res.sendStatus(500);
  }
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;