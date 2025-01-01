
const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    
    return jwt.sign(payload, process.env.SECRET);
        
   
}

const verifyToken = (req, res, next) => {
    
    const token = req.cookies.jwt;
    if (!token) return res.status(500).json({ status: false, data: "You Don't Have Token" });
    const isValid = jwt.verify(token, process.env.SECRET);
    if(!isValid) return res.status(500).json({ status: false, data: "Token Not Valid" });
    next();
}

module.exports={ generateToken,verifyToken };