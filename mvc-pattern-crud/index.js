const express = require('express');

const app = express();

const port = 8000;

app.set('view engine','ejs');

const db = require('./config/db');

app.use(express.urlencoded());

const path = require('path');

app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use('/',require('./routes/indexRoute'));

app.listen(port,(err)=>{
    if(err){
        console.log(`server is not start`);
        return false;
    }
    console.log(`server is  start on port :- http://localhost:${port}`);

})