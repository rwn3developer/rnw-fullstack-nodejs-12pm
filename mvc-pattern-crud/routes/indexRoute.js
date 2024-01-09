const express = require('express');

const routes = express.Router();

const crudcontroller = require('../controllers/CrudController');

routes.get('/',crudcontroller.viewRecord);
routes.get('/add',crudcontroller.add);
routes.post('/addRecord',crudcontroller.insertData);


module.exports = routes;