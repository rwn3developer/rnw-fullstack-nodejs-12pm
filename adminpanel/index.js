const express = require('express');
const path = require('path');

const app = express();

const port = 8000;

app.set('view engine','ejs');

const db = require('./config/db');

const session = require('express-session');

const flash = require('connect-flash');

app.use(session({
    name : 'rnw',
    secret : 'rnw4',
    saveUninitialized  :true,
    resave : true,
    cookie : {maxAge : 1000 * 60 * 60 * 24}
}))

app.use(flash());

app.use(function(req,res,next){
    res.locals.message = req.flash(); 
    next();
})

app.use(express.static(path.join(__dirname,'public')))

app.use(express.urlencoded());

app.use('/',require('./routes/indexRoutes'));

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log(`server is start on port :- ${port}`);
})