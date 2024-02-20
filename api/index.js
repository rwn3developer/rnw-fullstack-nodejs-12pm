const express = require('express');

const port = 9000;

const app = express();

const db = require('./config/db');

const User = require('./models/User');

app.use(express.urlencoded());

app.post('/register',async(req,res)=>{
        try{
            let name = req.body.name;
            let email = req.body.email;
            let password =  req.body.password;
            let city = req.body.city;
            let phone = req.body.phone;

            let chekEmail = await User.findOne({email : email});
            if(chekEmail){
                return res.status(200).send({
                    success : false,
                    message : "User is Already register",
                })
            }


            if(!name || !email || !password || !city || !phone){
                return res.status(200).send({
                    success : false,
                    message : "All field is required",
                })
            }
            
            let users = await User.create({
                name : name,
                email : email,
                password : password,
                city : city,
                phone : phone
            });
            return res.status(200).send({
                success : true,
                message : "User successfully register",
                users
            })
        }catch(err){
            return res.status(503).send({
                success : false,
                message : err
            })
        }
})

app.get('/alluser',async(req,res)=>{
    try{
        let users = await User.find({});
        return res.status(200).send({
            success : true,
            message : "User successfully fetch",
            users
        })
    }catch(err){
        return res.status(503).send({
            success : false,
            message : err
        })
    }
})

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log(`server is start on port :- ${port}`);
})

