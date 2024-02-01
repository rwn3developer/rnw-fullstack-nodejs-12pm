const express = require('express');

const routes = express.Router();

const passport = require('passport');

const authcontroller = require('../controllers/AuthController');

const categorycontroller = require('../controllers/CategoryController');
const subcategorycontroller = require('../controllers/SubcategoryController');
const exsubcategorycontroller = require('../controllers/ExsubcategoryController');



routes.get('/',authcontroller.index);
routes.get('/register',authcontroller.register);
routes.post('/registerUser',authcontroller.registerUser);

routes.post('/login',passport.authenticate('local',{failureRedirect : '/'}),authcontroller.login);


routes.get('/dashboard',passport.checkUser,authcontroller.dashboard);

//category
routes.get('/category',passport.checkUser,categorycontroller.category);
routes.get('/addcategory',passport.checkUser,categorycontroller.addcategory);
routes.post('/postCategory',passport.checkUser,categorycontroller.postCategory);
//category


//subcategory
routes.get('/subcategory',passport.checkUser,subcategorycontroller.subcategory);
routes.get('/addsubcategory',passport.checkUser,subcategorycontroller.addsubcategory);
routes.post('/postsubCategory',passport.checkUser,subcategorycontroller.postsubCategory);
//subcategory



//subcategory
routes.get('/exsubcategory',passport.checkUser,exsubcategorycontroller.exsubcategory);
routes.get('/addexsubcategory',passport.checkUser,exsubcategorycontroller.addexsubcategory);
routes.post('/postexsubCategory',passport.checkUser,exsubcategorycontroller.postrxsubCategory);
//subcategory




module.exports = routes