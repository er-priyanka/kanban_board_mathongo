const jwt = require("jsonwebtoken");
const KEY = process.env.KEY;

const authenticate = (req, res, next) => {
    // console.log(req.headers);
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({message: "Unauthorized"});
    }

    
    jwt.verify(token, KEY, (err, decoded) =>{
        if(err){
            return res.status(401).json({message: "Unauthorized"});
        }
        req.userId = decoded.userId;
        next();
    });

}





module.exports = {
    authenticate
}
