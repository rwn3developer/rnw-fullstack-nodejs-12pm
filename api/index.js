const express = require('express');

const port = 9000;

const app = express();

const db = require('./config/db');

const User = require('./models/User');
const Category = require('./models/Category');

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
app.post('/categoryAdd',async(req,res)=>{
    try{
        let category = req.body.category;
        if(!category){
            return res.status(200).send({
                success : false,
                message : "Category is required"
            })
        }
        let dup  = await Category.findOne({category : category});
        if(dup){
            return res.status(200).send({
                success : false,
                message : "Category is already added"
            }) 
        }
        let categoryadd = await Category.create({
            category : category,
        })
        return res.status(200).send({
            success : true,
            message : "Category is created"
        })
    }catch(err){
        return res.status(503).send({
            success : false,
            message : err
        })
    }
})
app.get('/categoryView',async(req,res)=>{
    try{
        let category = await Category.find({});
        return res.status(200).send({
            success : true,
            message : "category is fetch",
            category
        })
    }catch(err){
        return res.status(503).send({
            success : false,
            message : err
        })
    }
})  
app.delete('/categoryDelete',async(req,res)=>{
    try{
        let id = req.query.id;
        let check = await Category.findById(id);
        if(check){
            let deleteData = await Category.findByIdAndDelete(id);
            return res.status(200).send({
                success : false,
                message : "Category is delete"
            })
        }
    }catch(err){
        if(err.name === "CastError"){
            return res.status(503).send({
                success : false,
                message : "ID is not cleare"
            })
        }
    }

})
app.put('/categoryUpdate',async(req,res)=>{
    try{
        let id = req.query.id;
       let check = await Category.findById(id);
       let update = await Category.findByIdAndUpdate(id,{
            category : req.body.category
       })
       return res.status(200).send({
        success : true,
        message : "Category successfully update",
    })
    }catch(err){
        if(err.name === "CastError"){
            return res.status(503).send({
                success : false,
                message : "ID is proper input"
            })
        }
         
    }

})
app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log(`server is start on port :- ${port}`);
})

