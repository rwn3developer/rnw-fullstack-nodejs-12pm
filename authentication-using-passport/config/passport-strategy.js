const passport = require('passport');

const passportLocal = require('passport-local').Strategy;

const User = require('../models/userModel');

passport.use(new passportLocal({
    usernameField : 'email'
},async(email,password,done)=>{
    try{
       let user = await User.findOne({email : email});
       if(!user || user.password != password){
           console.log("Email and password not valid");
           return done(null,false)
       }
       return done(null,user)
    }catch(err){
        return done(null,false) 
    }
}))


module.exports = passport;