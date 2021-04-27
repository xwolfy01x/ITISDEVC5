const express = require('express');
const route = express();
const controller = require('../controllers/controller');
route.get('/', controller.getHome);
module.exports = route;