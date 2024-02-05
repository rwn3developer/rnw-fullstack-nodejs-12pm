const bcrypt = require('bcrypt')

const userModel = require('../models/UserModel');

const nodemailer = require('nodemailer')



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

const forgotpassword = async(req,res) => {
    try{
        let email = req.body.useremail
        let checkEmail = await userModel.findOne({email : email});
       if(checkEmail){
        let otp = Math.floor(Math.random() * 1000);
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'rwn3developer11@gmail.com',
              pass: 'ypvx btil psoi avsd'
            }
          });
          var mailOptions = {
            from: 'rwn3developer11@gmail.com',
            to: email,
            subject: `Otp`,
            text: `Dear ${checkEmail.name} Your Otp :- ${otp}`
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              res.cookie('otp',{
                otp : otp,
                email : email
              });
              return res.redirect('/otp');
            }
          });
       }else{
            req.flash('error',"User not found");
            return res.redirect('/');
       }
        
    }catch(err){
        console.log(err);
        return false;
    }
}

const otp = async(req,res) => {
    try{
        return res.render('otp');
    }catch(err){
        console.log(err);
        return false;
    }
}

const postOtp = async(req,res) => {
    try{
        let userOtp = req.body.otp;
        // console.log(req.cookies.otp.otp);
        if(req.cookies.otp.otp == userOtp){
            return res.redirect('/newpassword')
        }else{
            console.log("Otp is wrong");
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const newpassword = async(req,res) => {
    try{
        return res.render('newpassword')
    }catch(err){
        console.log(err);
        return false;
    }
}

const postNewpassword = async(req,res) => {
    try{
        let newpassword = req.body.newpassword;
        let cpassword = req.body.cpassword;
        if(newpassword == cpassword){
            let up = await userModel.findOneAndUpdate({email : req.cookies.otp.email},{
                password : await bcrypt.hash(req.body.newpassword,10)
            })
            res.clearCookie('otp');
            return res.redirect('/');
            
        }else{
            console.log("Password and Confirm password not match");
        }

    }catch(err){
        console.log(err);
        return false;
    }

}

module.exports = {
    dashboard,index,register,registerUser,login,forgotpassword,otp,postOtp,newpassword,postNewpassword
}