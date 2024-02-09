
const con = require('../config/db');

const index = (req,res) => {
    return res.render('form')
}
const addRecord = (req,res) => {
    let name=  req.body.name;
    let phone=  req.body.phone;
    var sql = "INSERT INTO `crud`(`name`, `phone`) VALUES ('"+name+"','"+phone+"')";
    con.query(sql,(err)=>{
        if(err){
            console.log("Record not insert");
            return false;
        }
        console.log("record successfully insert");
        return res.redirect('/')
    })
}

const view = (req,res) => {
    var sql = "select * from `crud`";
    con.query(sql,(err,record)=>{
        if(err){
            console.log(err);
            return false;
        }
        var a = JSON.stringify(record);
        var result = JSON.parse(a);
        return res.render('view',{
            result
        });
    })
}
const deleteRecord = (req,res) => {
    var id = req.query.id;
    var sql = "DELETE FROM `crud` WHERE id = "+id;
    console.log(sql);
    con.query(sql,(err)=>{
        if(err){
            console.log(err);
            return false;
        }
        return res.redirect('back');
    })
}

module.exports = {
    index,addRecord,view,deleteRecord
}