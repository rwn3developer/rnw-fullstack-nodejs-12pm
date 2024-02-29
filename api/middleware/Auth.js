const jwt = require('jsonwebtoken');
const verifyToken = async(req,res,next) => {
    try{
        const token = req.headers.authorization;
        if(!token){
            return res.status(503).send({
                success : false,
                message : "Unauthorize access"
            }) 
        }
        let newToken = token.split(" ")[1];
        jwt.verify(newToken,'rnw4',(err,decode)=>{
            if(err){
                return res.status(503).send({ 
                    success : false,
                    message : "Token is not valid" 
                }) 
            }
            req.user = decode;
            return next();
        });
       
    }catch(err){
        console.log(err);
        return false;
    }
}
const roleBaseAuth = (role)=>{
    return (req,res,next) => { 
        if(!role.includes(req.user.payload.role)){
            return res.status(200).send({ 
                success : false,
                message : "Only admin access" 
            }) 
        }
        return  next();
    }
}
module.exports = {
    verifyToken,roleBaseAuth
}