const express=  require('express');

const port = 8000;

const app = express();

app.set('view engine','ejs');

app.use(express.urlencoded());

app.use('/',require('./routes/indexRoute'))



app.listen(port,(err)=>{
    if(err) {
        console.log(`server is not start`); 
        return false;
    }
    console.log(`server is  start`); 
})