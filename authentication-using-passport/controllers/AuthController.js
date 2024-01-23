const userModel =  require('../models/userModel');

const index = (req,res) => {
    return res.render('index')
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
                password : req.body.password,
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

module.exports = {
    index,register,registerUser,loginUser,dashboard
}