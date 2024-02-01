const bcrypt = require('bcrypt')

const userModel = require('../models/UserModel');

const login = (req,res) => {
    return res.redirect('/dashboard');
}

const dashboard = (req,res) => {
    return res.render('dashboard');
}

const index = (req,res) => {
    return res.render('login')
}

const register = (req,res) => {
    return res.render('register')
}

const registerUser = async(req,res) => {
    try{ 
        if(req.body.password == req.body.cpassword){
            let users = await userModel.create({
                name : req.body.name,
                email : req.body.email,
                password : await bcrypt.hash(req.body.password,10)
             })
            req.flash("success","User register");
             return res.redirect('/register');
        }else{
            console.log("password and cpassword not match");
            return res.redirect('back');
        }
         
      }catch(err){
        console.log(err);
        return false;
      }
}

module.exports = {
    dashboard,index,register,registerUser,login
}