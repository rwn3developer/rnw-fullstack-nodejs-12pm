const UserModel = require('../models/UserModel');

const viewRecord = async(req,res) => {
    try{
        let record = await UserModel.find({});
        return res.render('index',{
            record
        });
    }catch(err){
        console.log(err);
        return false;
    }
}

const add = (req,res) => {
    return res.render('add');
}

const insertData = async(req,res) => {
   try{
        const {name,phone}  = req.body;

        if(!name || !phone){
            console.log("All field is required");
            return false
        }

        let userAdd = await UserModel.create({
            name,phone
        })
        if(userAdd){
            console.log("User successfully Add"); 
            return res.redirect('/');
        }else{
            console.log("something wrong");
            return false;
        }
   }catch(err){
        console.log(err);
        return false;
   }
}

module.exports ={
    viewRecord,
    add,
    insertData
}