const express = require('express');
const path = require('path');

const port = 8000;

const app = express();

const db = require('./config/db');

const User = require('./models/userModel');

const cookieParser = require('cookie-parser');

app.use(express.static(path.join((__dirname,'public'))));

app.set('view engine','ejs');

app.use(express.urlencoded());

app.use(cookieParser());

app.get('/',(req,res)=>{
    return res.render('index');
})

app.get('/register',(req,res)=>{
    return res.render('register');
})

app.get('/dashboard',(req,res)=>{
    if(!req.cookies['user']){
        return res.redirect('/');
    }
    return res.render('dashboard');
})

app.get('/charts',(req,res)=>{
    return res.render('charts');
})

app.get('/widgets',(req,res)=>{
    return res.render('widgets');
})

app.post('/registerUser',async(req,res)=>{
        try{
            let name = req.body.name;
            let email = req.body.email;
            let password = req.body.password;
            let cpassword = req.body.cpassword;

            if(cpassword == password){
                let user = await User.create({
                    name : name,
                    email : email,
                    password : password
                });
                console.log("User register");
                return res.redirect('/');   
            }else{
                console.log("Check your confirm password");
                return res.redirect('back');
            }

        }catch(err){
            console.log(err);
            return false;
        }
})

app.post('/loginUser',async(req,res)=>{
    try{
        let email = req.body.email;
        let password = req.body.password;
        let user = await User.findOne({email : email});
        if(!user || user.password != password){
            console.log("Email and password are wrong");
            return res.redirect('back');
        }
        res.cookie('user',user);
        return res.redirect('/dashboard');
    }catch(err){
        console.log(err);
        return false;
    }
})

app.listen(port,(err)=>{
    if(err){
        console.log(`server is not start`);
        return false;
    }
    console.log(`server is start on port :- ${port}`);  
    
})

