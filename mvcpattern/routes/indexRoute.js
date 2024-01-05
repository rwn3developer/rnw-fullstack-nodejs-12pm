const express = require('express');

const routes = express.Router();

const indexcontroller = require('../controllers/IndexController');
const homecontroller = require('../controllers/HomeController');
const aboutcontroller = require('../controllers/AboutController');
const productcontroller = require('../controllers/ProductController');



routes.get('/',indexcontroller.indexPage)
routes.get('/home',homecontroller.homePage);
routes.get('/about',aboutcontroller.aboutPage);
routes.get('/product',productcontroller.productPage);



module.exports = routes;