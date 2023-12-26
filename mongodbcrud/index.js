const express = require('express');

const port = 8000;

const app = express();

const db = require('./config/db');

const User = require('./models/userModel');

const multer = require('multer');

app.set('view engine','ejs');

app.use(express.urlencoded());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  const uploadImage = multer({ storage: storage }).array('images',5);

app.get('/',(req,res)=>{
    return res.render('view');
})

app.get('/add',(req,res)=>{
    return res.render('add');
})

app.post('/addRecord',uploadImage,(req,res)=>{

    let im = [];

    req.files.map((item)=>{
        im.push(item.path);
    })

   User.create({
        name : req.body.name,
        phone : req.body.phone,
        images : im
   }).then((success)=>{
        console.log("User add");
        return res.redirect('back');
   }).catch((err)=>{
        console.log(err);
        return false;
   })
})

app.listen(port,(err)=>{
    if(err){
        console.log(`server is not start`);
        return false;
    }
    console.log(`server is  start on port :- ${port}`);
})