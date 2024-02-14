
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

const editRecord = (req,res) => {
    var id = req.query.id;
    var sql = "SELECT * FROM `crud` WHERE id = "+id;
    con.query(sql,(err,single)=>{
        if(err){
            console.log(err);
            return false;
        }
        var str = JSON.stringify(single);
        var s = JSON.parse(str);
       return res.render('edit',{
            sin : s[0]
       })
    })
}

const updateRecord = (req,res) => {
    var id = req.body.id;
    var name = req.body.name;
    var phone = req.body.phone
    var sql = "UPDATE `crud` SET `name`='"+name+"',`phone`='"+phone+"' WHERE id = '"+id+"'";
    con.query(sql,(err)=>{
        if(err){
            console.log(err);
            return false;
        }
        console.log("Update");
        return res.redirect('/view');
    })
}

module.exports = {
    index,addRecord,view,deleteRecord,editRecord,updateRecord
}