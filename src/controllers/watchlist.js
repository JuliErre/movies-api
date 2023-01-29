const watchlist = require("../models/WatchList");
const { movies } = require("../models/Movie");

const  getUserWatchlist = async (req, res) => {
    try{
        const { id } = req.params;
        const userWatchlist = await watchlist.findOne({ userId: id });
        res.send(userWatchlist);
    }
    catch (err) {
        console.log(err);
    }
};


const addMovieToWatchlist = async (req, res) => {
    try {
        const { movieId, userId } = req.body;
        const userWatchlist = await watchlist.findOne({ userId: userId });
        const movie = userWatchlist.movies.find((movie) => movie.id == movieId);
        if (movie) {
            return res.status(400).json({ msg: "Movie already in watchlist" });
        }
        const movieToAdd = await movies.findOne({ id: movieId });
        await watchlist.updateOne({ userId: userId }, { $push: { movies: movieToAdd } });
        res.send("Movie added to watchlist");
    }
    catch (err) {
        console.log(err);
    }
};

const removeMovieFromWatchlist = async (req, res) => {
    try {
        
        const { movieId, userId } = req.body;
        console.log(movieId," ", userId);
        const userWatchlist = await watchlist.findOne
        ({ userId: userId});
        const movie = userWatchlist.movies.find((movie) => movie.id === movieId);
        if (!movie) {
            return res.status(400).json({ msg: "Movie not in watchlist" });
        }
        await watchlist.updateOne({ userId: userId }, { $pull: { movies: { id: movieId } } });
        res.send("Movie removed from watchlist");
    }
    catch (err) {
        console.log(err);
    }
};

module.exports = { getUserWatchlist, addMovieToWatchlist, removeMovieFromWatchlist };
            
