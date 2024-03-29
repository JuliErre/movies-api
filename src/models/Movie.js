const {model, Schema} = require('mongoose');

const movieSchema = new Schema({
    adult: Boolean,
    backdrop_path: String,
    genre_ids: Array,
    id: Number,
    original_language: String,
    original_title: String,
    overview: String,
    popularity: Number,
    poster_path: String,
    release_date: String,
    title: String,
    video: Boolean,
    vote_average: Number,
    vote_count: Number,
    trailer: String,
    cast: Array,

})


module.exports = {movies :model('movies', movieSchema)};
