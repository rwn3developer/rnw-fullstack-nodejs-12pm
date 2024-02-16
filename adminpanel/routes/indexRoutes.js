const express = require('express');

const routes = express.Router();

const passport = require('passport');

const authcontroller = require('../controllers/AuthController');

const categorycontroller = require('../controllers/CategoryController');
const subcategorycontroller = require('../controllers/SubcategoryController');
const exsubcategorycontroller = require('../controllers/ExsubcategoryController');
const productcontroller = require('../controllers/ProductController');




routes.get('/',authcontroller.index);
routes.get('/register',authcontroller.register);
routes.post('/registerUser',authcontroller.registerUser); 

routes.post('/login',passport.authenticate('local',{failureRedirect : '/'}),authcontroller.login);

routes.get('/logout',authcontroller.logout);

//forgot password
routes.post('/forgotpassword',authcontroller.forgotpassword);
routes.get('/otp',authcontroller.otp);
routes.post('/postOtp',authcontroller.postOtp);
routes.get('/newpassword',authcontroller.newpassword);
routes.post('/postNewpassword',authcontroller.postNewpassword);

routes.get('/dashboard',authcontroller.dashboard);

//category
routes.get('/category',categorycontroller.category);
routes.get('/addcategory',categorycontroller.addcategory);
routes.post('/postCategory',categorycontroller.postCategory);
routes.get('/categoryDelete',categorycontroller.categoryDelete);
routes.get('/categoryActive',categorycontroller.categoryActive);
routes.get('/categoryDective',categorycontroller.categoryDective);
//category


//subcategory
routes.get('/subcategory',subcategorycontroller.subcategory);
routes.get('/addsubcategory',subcategorycontroller.addsubcategory);
routes.post('/postsubCategory',subcategorycontroller.postsubCategory);
routes.get('/subcategoryDelete',subcategorycontroller.subcategoryDelete);
routes.get('/subcategoryEdit',subcategorycontroller.subcategoryEdit);
routes.post('/updateSubCategory',subcategorycontroller.updateSubCategory);
//subcategory



//exsubcategory
routes.get('/exsubcategory',exsubcategorycontroller.exsubcategory);
routes.get('/addexsubcategory',exsubcategorycontroller.addexsubcategory);
routes.post('/postexsubCategory',exsubcategorycontroller.postexsubCategory);
routes.get('/editexsubCategory',exsubcategorycontroller.editexsubCategory);
routes.post('/updateexsubCategory',exsubcategorycontroller.updateexsubCategory);
routes.get('/deleteexsubCategory',exsubcategorycontroller.deleteexsubCategory);
//exsubcategory


//product
routes.get('/product',productcontroller.product)


//ajax
routes.get(`/categoryWiseFilter`,exsubcategorycontroller.categoryWiseFilter);
routes.get('/productWiseFilter',productcontroller.productWiseFilter)

module.exports = routes