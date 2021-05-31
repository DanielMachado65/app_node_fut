const express = require('express');
const app = express();

// router
const routes = require('./router');
const port = 12345;

// bode qs que suporta modulos aninhados, e no caso de falso, não vai conseguir mostrar aninhado
// os objectos
app.use(express.urlencoded({ extended: true }))

// poder usar o json no request
app.use(express.json())

// importação das rotas
app.use(routes);
app.listen(port, () => {
    console.log('Api rodando na porta ' + port);
})