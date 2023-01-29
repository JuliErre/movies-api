require("../database");
const express = require("express");
const { register, login } = require("../controllers/auth");
const { getMovies, getMovieById, search, getMoviesbyGenre } = require("../controllers/movies");
const { updatePhoto } = require("../controllers/user");
const { getUserWatchlist, addMovieToWatchlist, removeMovieFromWatchlist } = require("../controllers/watchlist");
const router = express.Router();


router.get("/movies", getMovies);

router.get("/movies/:id", getMovieById);

router.get("/movies/search/:title", search);

router.get("/movies/genre/:id", getMoviesbyGenre);

router.get("/watchlist/:id", getUserWatchlist)

router.post("/watchlist", addMovieToWatchlist);

router.delete("/watchlist", removeMovieFromWatchlist);

router.post("/register", register)

router.post("/login", login)

router.patch("/photo", updatePhoto)


module.exports = router;
