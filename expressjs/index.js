 const express = require('express');

 const port = 8000;
 
 const app = express();

 app.set('view engine','ejs');

 let record = [
    {
        id : 1,
        name : "raj",
        phone : 1234
    },
    {
        id  : 2,
        name : "hari",
        phone : 6789
    }
 ]

 //middleware
 app.use(express.urlencoded());

 app.get('/',(req,res)=>{
    let single = {};
    return res.render('index',{
        record,single
    });
 })



 app.post('/addUser',(req,res)=>{
    let name = req.body.username;
    let phone = req.body.userphone;
    let id = req.body.editid;
    if(!name || !phone){
        console.log("All filed is required");
        return res.redirect('back');
    }
    let obj = {
        id : Math.floor(Math.random() * 100000),
        name,
        phone
    }
    if(id){
        let updateData = record.map((val)=>{
            if(val.id == id){ 
                val.name = name,
                val.phone = phone
            }
            return val;
        })
        record = updateData;
        console.log("user edited");
        return res.redirect('/');
    }else{
        record.push(obj);
        console.log("User successfully add");
        return res.redirect('/'); 
    }
 })

 app.get('/deleteData',(req,res)=>{
    let deleteId = req.query.deleteId;
    let deleteRecord = record.filter((val)=>{ 
        return val.id != deleteId;
    })
    record = deleteRecord;
    return res.redirect('/');
 })

 app.get('/editData',(req,res)=>{
    const id = req.query.editId;
    let single = record.find(item => item.id == id);
    return res.render('index',{single,record});
 })

 

 app.listen(port,(err)=>{
    if(err){
        console.log(err); 
        return false;
    }
    console.log(`running :- ${port}`);
 })