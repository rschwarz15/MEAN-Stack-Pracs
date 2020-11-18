//https://hub.packtpub.com/building-movie-api-express/
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
let path = require('path');

const actors = require('./routers/actor');
const movies = require('./routers/movie');

const app = express();
app.listen(8080);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "dist/Lab10")));

const url = 'mongodb://localhost:27017/movies'
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false }, function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});

//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.get('/actors/movies', actors.getAllAndPopulate); // Feature 7
app.get('/actors/:id', actors.getOne);

app.post('/actors', actors.createOne);
app.post('/actors/:id/movies', actors.addMovie);
app.post('/actors/:actorID/:movieID', actors.removeMovie); // Feature 3
app.post('/actors/:id', actors.removeAllMovies); // EXTRA TASK

app.put('/actors/:id', actors.updateOne);

app.delete('/actors/:id', actors.deleteOne);
app.delete('/actors/:id/movies', actors.deleteOneAndMovies); // Feature 2


//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.get('/movies/actors', movies.getAllAndPopulate); // Feature 8
app.get('/movies/:id', movies.getOne);
app.get('/movies/:year1/:year2', movies.getAllWithinYears); // Feature 6

app.post('/movies', movies.createOne);
app.post('/movies/:id/actors', movies.addActor); //Feature 5
app.post('/movies/:movieID/:actorID', movies.removeActor); // Feature 4

app.put('/movies/:id', movies.updateOne);

app.delete('/movies/:id', movies.deleteOne); // Feature 1
app.delete('/movies', movies.deleteAllWithinYears); // Feature 9
app.delete('/movies/:year1/:year2', movies.deleteAllWithinYearsURLParams); // Feature 9.2