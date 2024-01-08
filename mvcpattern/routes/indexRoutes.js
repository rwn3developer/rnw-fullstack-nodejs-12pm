const express = require('express');

const routes = express.Router();

const homecontroller = require('../controllers/HomeController');
const productcontroller = require('../controllers/ProductController');
const aboutcontroller = require('../controllers/AboutController');

routes.get('/',homecontroller.milansir);
routes.get('/product',productcontroller.productPage);
routes.get('/about',aboutcontroller.aboutPage)


module.exports = routes;