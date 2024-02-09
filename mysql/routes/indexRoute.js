const express = require('express');

const routes = express.Router();

const commoncontroller = require('../controller/CommonController');

routes.get('/',commoncontroller.index);
routes.post('/addRecord',commoncontroller.addRecord);
routes.get('/view',commoncontroller.view);

module.exports = routes;
