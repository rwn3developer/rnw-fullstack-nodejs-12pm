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
        });
        return next();
    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports = {
    verifyToken
}