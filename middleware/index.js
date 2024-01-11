const express = require('express');

const port = 9000;

const app =express();

app.set('view engine','ejs');

const path = require('path');

app.use(express.static(path.join(__dirname,'public')));

const chekAge = (req,res,next) => {
    if(req.query.user === "decora" && req.query.password === "1234"){
        return next();
    }
    return res.redirect('/404');
}

app.get('/',(req,res)=>{
    return res.render('index');
})

app.get('/home',(req,res)=>{
    return res.render('home');
})

app.get('/about',chekAge,(req,res)=>{
    return res.render('about');
})

app.get('/contect',chekAge,(req,res)=>{
    return res.render('contect');
})

app.get('/404',(req,res)=>{
    return res.render('404');
})


//middleware register
app.use(chekAge);

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log(`server is start on port :- ${port}`);
})