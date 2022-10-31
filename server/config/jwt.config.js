const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET_KEY
// const secret = "I can't believe this key is so secret!";
// module.exports.secret = secret;
module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.userToken, SECRET, (err, payload) => {
        if (err) { 
        res.status(401).json({verified: false});
        } else {
        next();
        }
    });
}