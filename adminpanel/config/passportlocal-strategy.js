const passport = require('passport');

const passportLocal = require('passport-local').Strategy;

const User = require('../models/UserModel');


const bcrypt = require('bcrypt');

passport.use(new passportLocal({
    usernameField : 'email'
},async(email,password,done)=>{
    try{
        let user = await User.findOne({email : email});
        if(!user){
            console.log("User not found");
            return done(null,false);
        }
        let match = await bcrypt.compare(password,user.password);
        if(!match){
            console.log("Password not match");
            return done(null,false)
        }
        return done(null,user);
    }catch(err){ 
        console.log(err);
        return done(null,false);
    }
}))

passport.serializeUser((user,done)=>{
    return done(null,user._id);
})


passport.deserializeUser(async(id,done)=>{
    try{
        let user = await User.findById(id);
        return done(null,user);
    }catch(err){
        console.log(err);
        return done(null,false);
    }
})

passport.checkUser = (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}

passport.setUser = (req,res,next) => {
    if(req.isAuthenticated()){
        res.locals.users = req.user
    }
    return next();
}

module.exports = passport;