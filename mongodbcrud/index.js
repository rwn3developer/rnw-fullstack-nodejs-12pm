const express = require('express');

const port = 8000;

const app = express();

const db = require('./config/db');

const User = require('./models/userModel');

app.set('view engine','ejs');

app.use(express.urlencoded());

app.get('/',(req,res)=>{
    return res.render('view');
})

app.get('/add',(req,res)=>{
    return res.render('add');
})

app.post('/addRecord',(req,res)=>{
   User.create({
        name : req.body.name,
        phone : req.body.phone,
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