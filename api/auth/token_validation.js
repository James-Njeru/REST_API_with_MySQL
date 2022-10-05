const jwt = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) =>{
        let token = req.get("authorization");
        if(token){
            //remove bearer from the token
            token = token.slice(7);// bearer
            jwt.verify(token, "qwe1234", (err, decode)=>{
                if(err){
                    return res.json({
                        success: 0,
                        message: "Invalid token"
                    });
                }else{
                    req.decode = decode;
                    next();
                }
            });
        }else{
            res.json({
                success: 0,
                message: "Access denied! Unauthorized user"
            });
        }
    }
}