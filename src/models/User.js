const {model, Schema} = require('mongoose');

const userDataScheme = new Schema({

    password: String,
    email: String,
    name: String,
    createdAt: Date,
    updatedAt: Date,
})


module.exports = model('users', userDataScheme);
