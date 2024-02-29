const jwt = require("jsonwebtoken");
const KEY = process.env.KEY;

const authenticate = (req, res, next) => {
    const token = req.headers.authorization;

    if(token){
        const decoded = jwt.verify(token, KEY);

        if(decoded){
            const userId = decoded.userId;

            next();
        }else{
            res.send("Please login first");
        }
    }else{
        res.send("Please Login First");
    }
}



module.exports = {
    authenticate
}
