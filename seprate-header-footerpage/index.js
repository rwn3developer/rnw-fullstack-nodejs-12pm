const express = require('express');
const path = require('path');

const port = 8000;

const app = express();

app.use(express.static(path.join((__dirname,'public'))));

app.set('view engine','ejs');

app.get('/dashboard',(req,res)=>{
    return res.render('dashboard');
})

app.get('/charts',(req,res)=>{
    return res.render('charts');
})

app.get('/widgets',(req,res)=>{
    return res.render('widgets');
})

app.listen(port,(err)=>{
    if(err){
        console.log(`server is not start`);
        return false;
    }
    console.log(`server is start on port :- ${port}`);  
    
})

