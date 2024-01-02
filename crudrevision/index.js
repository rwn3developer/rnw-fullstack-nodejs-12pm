const express = require('express');

const port = 8000;

const app = express();

app.set('view engine','ejs');

const db = require('./config/db');

const User = require('./models/userModel');

app.use(express.urlencoded());


//route , http request , url
app.get('/',(req,res)=>{
    User.find({})
    .then((record)=>{
        return res.render('index',{record});
    }).catch((err)=>{
        console.log(err);
        return false;
    })
   
})

app.get('/add',(req,res)=>{
    return res.render('form');
})

app.post('/addRecord',(req,res)=>{
    const {name,email,password,gender,hobby,city,phone} = req.body;
    if(!name || !email || !password || !gender || !hobby || !city || !phone){
        console.log("All field are required");
        return res.redirect('back');
    }
    User.create({
        name,email,password,gender,hobby,city,phone
    }).then((success)=>{
        console.log("User successfully insert");
        return res.redirect('/')
    }).catch((err)=>{
        console.log(err);
        return false;
    })
})

app.get('/deleteRecord',(req,res)=>{
    let id = req.query.id;
    User.findByIdAndDelete(id)
    .then((success)=>{
        console.log("User delete");
        return res.redirect('back');
    }).catch((err)=>{
        console.log(err);
        return false;
    })
})



//server created
app.listen(port,(err)=>{
    if(err){
        console.log(`server is not start`);
        return false;
    }
    console.log(`server is  start on port :- ${port}`);

})