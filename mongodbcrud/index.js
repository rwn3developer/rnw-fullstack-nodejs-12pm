const express = require('express');

const port = 8000;

const app = express();

const path = require('path');

const fs = require('fs');

const db = require('./config/db');

const User = require('./models/userModel');

const multer = require('multer');

app.set('view engine','ejs');

app.use(express.urlencoded());

app.use('/uploads',express.static(path.join(__dirname,'uploads')));

//multiple file upload start
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  const uploadImage = multer({ storage: storage }).array('images',5);
//multiple file upload end

app.get('/',(req,res)=>{
    User.find({}).
    then((record)=>{
      return res.render('view',{
        record
      });
    }).catch((err)=>{
      console.log("record not fetch");
      return false;
    })
    
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

app.get('/deleteData',(req,res) => {
    let id = req.query.id;

    User.findById(id).then((oldRecord)=>{
      //using for loop
      for(i=0;i<oldRecord.images.length;i++){
          fs.unlinkSync(oldRecord.images[i]); 
      }
      //using map method
      // oldRecord.images.map((val)=>{
      //   fs.unlinkSync(val);
      // })
    }).catch((err)=>{
      console.log(err);
      return false;
    })

    User.findByIdAndDelete(id).then((success)=>{
        console.log("Delete record");
        return res.redirect('/');
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