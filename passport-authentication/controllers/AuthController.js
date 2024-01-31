const bcrypt = require('bcrypt');
const userModel =  require('../models/userModel');

const index = (req,res) => {
    if(res.locals.users){
        return res.redirect('/dashboard');
    }
    return res.render('index');
}

const register = (req,res) => {
    return res.render('register');
}

const registerUser = async(req,res) => {
      try{ 
        if(req.body.password == req.body.cpassword){
            let users = await userModel.create({
                name : req.body.name,
                email : req.body.email,
                password : await bcrypt.hash(req.body.password,10)
             })
             console.log("User register");
             return res.redirect('/');
        }else{
            console.log("password and cpassword not match");
            return res.redirect('back');
        }
         
      }catch(err){
        console.log(err);
        return false;
      }
}

const loginUser = (req,res) => {
     return res.redirect('dashboard');
}

const dashboard = (req,res) => {
    return res.render('dashboard');
}

const userLogout = (req,res) => {
    req.logout((err)=>{
        if(err){
            console.log(err);
            return false;
        }
        return res.redirect('/');
    })
}



module.exports = {
    index,register,registerUser,loginUser,dashboard,userLogout
}