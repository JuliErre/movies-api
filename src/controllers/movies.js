const { movies } = require("../models/Movie");
const getMovies = async (req, res) => {
    try {
        const allMovies = await movies.find({});
        res.json(allMovies);
    } catch (err) {
        console.log(err);
    }
}


const getMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await movies.find({ id: id });
        res.send(movie);
    } catch (err) {
        console.log(err);
    }
}


const getMoviesbyGenre = async (req, res) => {
    try {
        const { id } = req.params;
        const genre = Number(id);
        const moviesByGenre = await movies.find({ genre_ids: genre });
        res.send(moviesByGenre);
    } catch (err) {
        console.log(err);
    }

}
const search = async (req, res) => {
    try {
        const { title } = req.params;
        const titleArray = title.split(" ");

        const titleArrayUp = titleArray.map((name) => {
            return name.charAt(0).toUpperCase() + name.slice(1);
        });

        const titleUp = titleArrayUp.join(" ");

        const searchMovies = await movies.find({ title: { $regex: titleUp } });
        res.send(searchMovies);
    } catch (err) {
        console.log(err);
    }
}

module.exports = { getMovies, getMovieById, getMoviesbyGenre, search };

