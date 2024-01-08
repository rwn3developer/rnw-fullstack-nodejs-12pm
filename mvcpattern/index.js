const express = require('express');

const app = express();

const port = 8000;

app.set('view engine','ejs');

app.use('/',(require('./routes/indexRoutes')))

app.listen(port,(err)=>{
    if(err){
        console.log(`server is not start`);
        return false;
    }
    console.log(`server is start on port :- ${port}`);
})