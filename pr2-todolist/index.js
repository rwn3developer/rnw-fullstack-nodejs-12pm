const express = require('express');

const port = 8000;

const app = express();

let task = [
    {
        id : 111,
        task : "home work",
        status : "default" 
    },
    {
        id : 222,
        task : "home work",
        status : "default"
    }
]

app.use(express.urlencoded());

app.set('view engine','ejs');

app.get('/',(req,res)=>{
    return res.render('todo',{task})
})

app.get('/editTask',(req,res)=>{
    let id = req.query.id;
    let single =task.find(item => item.id == id )
    return res.render('edit',{single}); 
})

app.post('/editTodo',(req,res)=>{
   let up = task.map((val)=>{
        if(val.id == req.body.editId){
            val.task = req.body.task;
            val.status = req.body.status;
        }
        return val;
   })

   task = up;
   return res.redirect('/');
   
})

app.listen(port,(err)=>{
    if(err){
        console.log("server is not start");
        return false;
    }
    console.log("server is  start on port :- "+port);

})