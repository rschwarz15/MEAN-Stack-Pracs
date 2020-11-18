const mongoose = require('mongoose');

const Actor = require('../models/actor');
const Movie = require('../models/movie');

module.exports = {
    getAll: function (req, res) {
        Actor.find(function (err, actors) {
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(actors);
            }
        });
    },

    getAllAndPopulate: function (req, res) {
        Actor.find({})
            .populate('movies')
            .exec(function (err, actors) {
                if (err) {
                    return res.status(404).json(err);
                } else {
                    res.json(actors);
                }
            });
    },

    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();
        let actor = new Actor(newActorDetails);
        actor.save(function (err) {
            res.json(actor);
        });
    },

    getOne: function (req, res) {
        Actor.findOne({ _id: req.params.id })
            .populate('movies')
            .exec(function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                res.json(actor);
            });
    },

    updateOne: function (req, res) {
        Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);
        });
    },

    deleteOne: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },

    addMovie: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findOne({ _id: req.body.id }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            })
        });
    },

    deleteOneAndMovies: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();

            // delete all the movies
            for (const movieID of actor.movies) {
                Movie.findOneAndRemove({ _id: movieID }, function (err, movie) {
                    if (err) return res.status(400).json(err);
                    if (!movie) return res.status(404).json();
                })
            }

            res.json();
        });
    },

    removeMovie: function (req, res) {
        Actor.findOne({ _id: req.params.actorID }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findOne({ _id: req.params.movieID }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();

                // find the movie in the actor array and delete if present
                var index = actor.movies.indexOf(movie._id);
                if (index > -1) {
                    actor.movies.splice(index, 1);
                } else {
                    return res.status(404).json(); // Not found if movie isn't in array
                }

                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            })
        });
    },

    removeAllMovies: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();

            // delete all movies from actor 
            actor.movies = [];

            actor.save(function (err) {
                if (err) return res.status(500).json(err);
                res.json(actor);
            });
        });
    },
};