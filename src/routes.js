const express = require('express');
const cadastroClientes = require('./controllers/clientes/cadastro');
const getClientes = require('./controllers/clientes/clientes');
const deleteCliente = require('./controllers/clientes/delete');
const editarCliente = require('./controllers/clientes/editar');
const login = require('./controllers/corretores/login');
const getImoveis = require('./controllers/imoveis/imoveis');
const cadastroDeVendas = require('./controllers/vendas/cadastro');
const tokenVerify = require('./middlewares/tokenVerify');

const routes = express();

routes.post('/login', login);

routes.get('/clientes',tokenVerify, getClientes);
routes.post('/cliente-cadastro', tokenVerify , cadastroClientes);
routes.put('/cliente-edicao',tokenVerify, editarCliente);
routes.delete('/clientes/:id',tokenVerify, deleteCliente);

routes.get('/imoveis', tokenVerify, getImoveis);

routes.post('/vendas-cadastro', tokenVerify, cadastroDeVendas);

module.exports = routes;