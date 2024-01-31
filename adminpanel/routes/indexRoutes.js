const express = require('express');

const routes = express.Router();


const authcontroller = require('../controllers/AuthController');

const categorycontroller = require('../controllers/CategoryController');
const subcategorycontroller = require('../controllers/SubcategoryController');


routes.get('/dashboard',authcontroller.dashboard);

//category
routes.get('/category',categorycontroller.category);
routes.get('/addcategory',categorycontroller.addcategory);
routes.post('/postCategory',categorycontroller.postCategory);
//category


//subcategory
routes.get('/subcategory',subcategorycontroller.subcategory);
routes.get('/addsubcategory',subcategorycontroller.addsubcategory);
routes.post('/postsubCategory',subcategorycontroller.postsubCategory);
//subcategory




module.exports = routes