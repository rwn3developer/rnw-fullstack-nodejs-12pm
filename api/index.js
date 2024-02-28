const express = require('express');

const port = 9000;

const app = express();

const db = require('./config/db');

const jwt = require('jsonwebtoken');

const {verifyToken, roleBaseAuth} = require('./middleware/Auth');

const User = require('./models/User');
const Category = require('./models/Category');
const Subcategory = require('./models/Subcategory');

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
app.post('/categoryAdd',verifyToken,async(req,res)=>{
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
app.get('/categoryView',verifyToken,async(req,res)=>{
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
app.delete('/categoryDelete',verifyToken,roleBaseAuth(["admin","manager"]),async(req,res)=>{
    try{
        let id = req.query.id;
        let check = await Category.findById(id);
        if(check){
            let deleteData = await Category.findByIdAndDelete(id);
            return res.status(200).send({
                success : true,
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
app.post('/login',async(req,res)=>{
    try{
        let email = req.body.email;
        let password = req.body.password;
        let user = await User.findOne({email : email});
        if(!user || user.password != password){
            return res.status(503).send({
                success : false,
                message : "Email and password not valid"
            }) 
        }
        let token = jwt.sign({payload : user},"rnw4",{expiresIn : '1hr'});
        return res.status(200).send({
            success : true,
            message : "Token is here",
            token
        }) 
    }catch(err){
        console.log(err);
        return false;
    }
})
//subcategory
app.post('/subcategoryAdd',async(req,res)=>{
    try{
        let addsubcat = await Subcategory.create({
            categoryId : req.body.category,
            subcategory : req.body.subcategory
        })
        return res.status(200).send({
            success : true,
            message : "subcategory successfully add",
            addsubcat
        }) 
    }catch(err){
        return res.status(503).send({
            success : false,
            message : err
        })
    }
})
app.get('/subcategoryView',async(req,res)=>{
    try{
        //using populate method
        // let subcat = await Subcategory.find({}).populate("categoryId");

        //using aggregate method
        let subcat = await Category.aggregate([
            {
                $lookup : {
                    from : "subcategories",
                    localField : "_id",
                    foreignField : "categoryId",
                    as : "subcategory"

                }
            }
        ])
        return res.status(200).send({
            success : true,
            message : "subcategory fetch",
            subcat
        }) 
    }catch(err){
        return res.status(503).send({
            success : false,
            message : err
        })
    }
})
app.delete('/subcategoryDelete',async(req,res)=>{
    try{
        let id = req.query.id;
        await Subcategory.findByIdAndDelete(id);
        return res.status(200).send({
            success : true,
            message : "subcategory delete",
        }) 
    }catch(err){
        return res.status(503).send({
            success : false,
            message : err
        })
    }
})
app.put('/subcategoryUpdate',async(req,res)=>{
    try{
        let id = req.body.id;
        await Subcategory.findByIdAndUpdate(id,{
            subcategory : req.body.subcategory
        })
        return res.status(200).send({
            success : true,
            message : "subcategory updated",
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

