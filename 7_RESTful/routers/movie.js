const mongoose = require('mongoose');

var Actor = require('../models/actor');
var Movie = require('../models/movie');

module.exports = {
    getAll: function (req, res) {
        Movie.find(function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        });
    },

    getAllAndPopulate: function (req, res) {
        Movie.find({})
            .populate('actors')
            .exec(function (err, movies) {
                if (err) {
                    return res.status(404).json(err);
                } else {
                    res.json(movies);
                }
            });
    },

    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },

    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },

    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },

    deleteOne: function (req, res) {
        Movie.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },

    addActor: function (req, res) {
        Movie.findOne({ _id: req.params.id }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({ _id: req.body.id }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            })
        });
    },

    removeActor: function (req, res) {
        Movie.findOne({ _id: req.params.movieID }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({ _id: req.params.actorID }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();

                // find the actor in the movie array and delete if present
                var index = movie.actors.indexOf(actor._id);
                if (index > -1) {
                    movie.actors.splice(index, 1);
                } else {
                    return res.status(404).json(); // Not found if actor isn't in array
                }

                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            })
        });
    },

    getAllWithinYears: function (req, res) {
        // Check the strings are numbers
        if (!isNaN(req.params.year1) && !isNaN(req.params.year2)) {
            let year1 = +req.params.year1;
            let year2 = +req.params.year2;

            // Check that the numbers are integers
            if (Number.isInteger(year1) && Number.isInteger(year2)) {
                if (year1 <= year2) return res.status(400).json("Year1 must be greater than Year2")

                let filter = { "year": { $lte: year1, $gte: year2 } };
                Movie.find(filter, function (err, movies) {
                    if (err) return res.status(400).json(err);
                    if (!movies) return res.status(404).json();
                    res.json(movies)
                });
            } else {
                res.status(400).json("Years given were not Integers");
            }
        } else {
            res.status(400).json("Years given were not Numbers");
        }
    },

    deleteAllWithinYears: function (req, res) {
        // Check the strings are numbers
        if (!isNaN(req.body.year1) && !isNaN(req.body.year2)) {
            let year1 = +req.body.year1;
            let year2 = +req.body.year2;

            // Check that the numbers are integers
            if (Number.isInteger(year1) && Number.isInteger(year2)) {
                if (year1 <= year2) return res.status(400).json("Year1 must be greater than Year2")

                let filter = { "year": { $lte: year1, $gte: year2 } };
                Movie.find(filter, function (err, movies) {
                    if (err) return res.status(400).json(err);
                    if (!movies) return res.status(404).json();

                    // delete all the movies
                    for (const movie of movies) {
                        Movie.findOneAndRemove({ _id: movie._id }, function (err, movie) {
                            if (err) return res.status(400).json(err);
                            if (!movie) return res.status(404).json();
                        })
                    }
                });
            } else {
                res.status(400).json("Years given were not Integers");
            }
        } else {
            res.status(400).json("Years given were not Numbers");
        }

        res.json();
    },

};


