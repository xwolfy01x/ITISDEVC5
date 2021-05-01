const express = require('express');
const route = express();
const controller = require('../controllers/controller');
route.get('/', controller.getHome);
route.get('/inventory', controller.getInventory);
route.get('/products', controller.getProducts);
route.get('/transactions', controller.getTransactions);
route.post('/postPrice', controller.postPriceChange);
module.exports = route;