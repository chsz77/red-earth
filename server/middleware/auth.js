require("dotenv").load();
const jwt = require("jsonwebtoken");

exports.loginRequired = function(req, res, next){
    try{
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if(decoded){
                return next()
            } else {
                return next({
                    status: 401,
                    message: "Access denied"
                })
            }
        })
        
    } catch (err){
        return next({ status: 401, message: "Access denied"})
        
    }
    
}
exports.ensureCorrectUser = function(req, res, next){
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            console.log(decoded)
            if(decoded && decoded.id === req.params.user_id){
                return next();
            } else {
                return next({
                    status: 401,
                    message: "You are not allowed to do that."
                })
            }
        })
    } catch (err) {
        return next({
            status: 401,
            message: "You are not allowed to do that."
        })
    }
}