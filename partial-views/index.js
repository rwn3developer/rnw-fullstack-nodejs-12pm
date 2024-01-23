const express = require('express');
const path = require('path');

const port = 8000;

const app = express();

app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    return res.render('dashboard')
})

app.listen(port,(err)=>{
    if(err){
        console.log(`server is not start`);
        return false;
    }
    console.log(`server is  start on port :- ${port}`);

})