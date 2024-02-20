const express = require('express');

const port = 8000;

const app = express();

app.set('view engine','ejs')
 
const db = require('./config/db'); 

const {category,subcategory} = require('./models/Category')

const cors = require('cors')

app.use(cors());

app.get('/',async(req,res)=>{
    try{
        let cat = await category.find({});
        return res.render('category',{
            cat
        })
    }catch(err){
        console.log(err);
        return false;
    }
})

app.get('/categorywisefilter',async(req,res)=>{ 
    try{
        let id = req.query.id;
        let sub = await subcategory.find({}).populate("categoryId");
        var ans = sub.filter((val)=>{
            return val.categoryId._id == id
        })
        return res.json(
            ans
        )
    }catch(err){
        console.log(err);
        return false;
    }
})

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log(`server is start on port :- ${port}`);
})