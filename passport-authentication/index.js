const express = require('express');
const path = require('path');

const port = 8000;

const app = express();

const db = require('./config/db');

const User = require('./models/userModel');

const cookieParser = require('cookie-parser');

app.use(express.static(path.join((__dirname,'public'))));

app.set('view engine','ejs');

const passport = require('passport');
const passportLocal = require('./config/passport-strategy');
const session = require('express-session');

app.use(session({
    name : 'rnw',
    secret : 'rnw4',
    saveUninitialized : true,
    resave : true,
    cookie : {
        maxAge : 1000 * 60 * 60 * 24
    }
}))





app.use(express.urlencoded());

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUser)

app.use('/',(require('./routes/indexRoute')));



app.listen(port,(err)=>{
    if(err){
        console.log(`server is not start`);
        return false;
    }
    console.log(`server is start on port :- ${port}`);  
    
})

