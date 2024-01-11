const express = require('express');

const routes = express.Router();

const crudcontroller = require('../controllers/CrudController');

const multer = require('multer');

//file upload
const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"uploads")
    },
    filename : (req,file,cb) => {
        let img = Date.now()+"-"+file.originalname
        cb(null,img);
    }
})
const fileUpload = multer({storage : storage}).single('avatar');

routes.get('/',crudcontroller.viewRecord);
routes.get('/add',crudcontroller.add);
routes.post('/addRecord',fileUpload,crudcontroller.insertData);

routes.get('/api',crudcontroller.apicalling);
routes.get('/themedata',crudcontroller.themedata);
routes.get('/deleteData',crudcontroller.deleteData);
routes.get('/editData',crudcontroller.editData);
routes.post('/updateRecord',fileUpload,crudcontroller.updateRecord);




module.exports = routes;