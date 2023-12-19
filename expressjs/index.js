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
    return res.render('index',{
        record
    });
 })

 app.get('/add',(req,res)=>{
    return res.render('add');
 })

 app.post('/addUser',(req,res)=>{
    let name = req.body.username;
    let phone = req.body.userphone;
    if(!name || !phone){
        console.log("All filed is required");
        return res.redirect('back');
    }
    let obj = {
        id : Math.floor(Math.random() * 100000),
        name,
        phone
    }
    record.push(obj);
    console.log("User successfully add");
    return res.redirect('/'); 
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
    let editId = req.query.editId;
    let single = record.find(item => item.id == editId);
    if(!single){
        console.log("Invalid Id"); 
        return res.redirect('/');
    }
    return res.render('edit',{single});
 })


 app.post('/updateUser',(req,res)=>{
    let updateRecord = record.map((val)=>{
        if(val.id == req.body.editid){
            val.name = req.body.username;
            val.phone = req.body.userphone;
        }
        return val;
    })

    record = updateRecord;
    console.log("Record successfully updated");
    return res.redirect('/');

 })


 app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log(`running :- ${port}`);
 })