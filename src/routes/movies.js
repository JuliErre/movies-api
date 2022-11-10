require("../database");
const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const { movies, watchlist } = require("../models/Movie");

router.get("/movies", (req, res) => {
    movies.find({}).then((movies) => {
        res.json(movies);
    });
});

router.get("/movies/:id", (req, res) => {
    const { id } = req.params;
    movies.find({ id: id }).then((movie) => {
        res.send(movie);
    });
});

router.get("/movies/search/:title", (req, res) => {
    const { title } = req.params;
    const titleArray = title.split(" ");

    const titleArrayUp = titleArray.map((name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    });

    const titleUp = titleArrayUp.join(" ");

    movies.find({ title: { $regex: titleUp } }).then((movies) => {
        res.send(movies);
    });
});

router.get("/movies/genre/:id", (req, res) => {
    const { id } = req.params;
    const genre = Number(id);

    movies.find({ genre_ids: genre }).then((movies) => {
        res.send(movies);
    });
});

router.get("/watchlist", (req, res) => {
    watchlist.find({}).then((movies) => {
        res.json(movies);
    });
});

router.post("/watchlist", (req, res) => {
    const { id } = req.body;
    movies.find({ id: id }).then((movie) => {
        const newMovie = new watchlist({
            adult: movie[0].adult,
            backdrop_path: movie[0].backdrop_path,
            genre_ids: movie[0].genre_ids,
            id: movie[0].id,
            original_language: movie[0].original_language,
            original_title: movie[0].original_title,
            overview: movie[0].overview,
            popularity: movie[0].popularity,
            poster_path: movie[0].poster_path,
            release_date: movie[0].release_date,
            title: movie[0].title,
            video: movie[0].video,
            vote_average: movie[0].vote_average,
            vote_count: movie[0].vote_count,
        });
        newMovie.save().then((movie) => {
            res.send(movie);
        });
    });
});

router.delete("/watchlist/:id", (req, res) => {
    const { id } = req.params;
    watchlist.deleteOne({ id: id }).then((movie) => {
        res.send(movie);
    });
});

module.exports = router;
