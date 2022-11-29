const bycrypt = require('bcryptjs');

const encryptPassword = async (password) =>{
    const hash = await bycrypt.hash(password,10);
    return hash;
}


const comparePassword = async (password,hash) =>{
    return await bycrypt.compare(password,hash);
    
}

module.exports = {encryptPassword,comparePassword}