const {model, Schema} = require('mongoose');

const watchlist = new Schema({
    userId: String,
    movies: Array
})

module.exports = model('watchlist', watchlist);