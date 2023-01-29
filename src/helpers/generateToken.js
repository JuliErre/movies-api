const jwt = require('jsonwebtoken');

const tokenSign = async (user) => {
    return jwt.sign({
        id: user._id,
        name: user.name,
    },process.env.JWT_SECRET,{expiresIn: '3h'});
    
}

const verifyToken = async (token) => {
    try {
        
        return jwt.verify(token,process.env.JWT_SECRET);
    }
    catch(err){
        return null 
    }
}

module.exports = {tokenSign,verifyToken};