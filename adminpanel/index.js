const express = require('express');
const path = require('path');

const app = express();

const port = 8000;

app.set('view engine','ejs');

const db = require('./config/db');

const cookieParser = require('cookie-parser');

app.use(cookieParser());


const flash = require('connect-flash');

const passport = require('passport');
const passportLocal = require('./config/passportlocal-strategy');
const session = require('express-session');


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
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUser)  

app.use(
    (setNoBack = (req, res, next) => {
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); 
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0"); 
      return next();
    })
  );

app.use('/',require('./routes/indexRoutes'));



app.listen(port,(err)=>{ 
    if(err){
        console.log(err);
        return false;
    }
    console.log(`server is start on port :- ${port}`); 
})