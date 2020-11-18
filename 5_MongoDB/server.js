//Import packages
const express = require("express");
const mongodb = require("mongodb");
const bodyparser = require('body-parser');
const morgan = require('morgan');

//Configure Express
const app = express()
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('images'));
app.use(express.static('css'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(morgan('common'));
app.listen(8080);

//Configure MongoDB
const MongoClient = mongodb.MongoClient;

// Connection URL
const url = "mongodb://localhost:27017/";

//reference to the database
let db;

//Connect to mongoDB server
MongoClient.connect(url, { useNewUrlParser: true },
    function (err, client) {
        if (err) {
            console.log("Err  ", err);
        } else {
            console.log("Connected successfully to server");
            db = client.db("fit2095db");
        }
    });


// Home
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

// Add Book
app.get('/addBook', function (req, res) {
    res.sendFile(__dirname + '/views/addBook.html');
});

app.post('/addbookdata', function (req, res) {
    let b = req.body;
    db.collection('week5Lab').insertOne({ title: b.title, author: b.author, ISBN: b.ISBN, dop: b.dop, summary: b.summary });
    res.redirect('/listBooks');
});

// List All Books
app.get('/listBooks', function (req, res) {
    db.collection('week5Lab').find({}).toArray(function (err, data) {
        res.render('listBooks', { bookDb: data });
    });
});

// Update Book
app.get('/updateBook', function (req, res) {
    res.sendFile(__dirname + '/views/updateBook.html');
});

app.post('/updatebookdata', function (req, res) {
    let b = req.body;
    let filter = { ISBN: b.ISBN };
    let update = { $set: { title: b.title, author: b.author, dop: b.dop, summary: b.summary } };
    db.collection('week5Lab').updateOne(filter, update);
    res.redirect('/listBooks');
})

// Delete Book
app.get('/deleteBook', function (req, res) {
    res.sendFile(__dirname + '/views/deleteBook.html');
});

app.post('/deletebookdata', function (req, res) {
    let b = req.body;
    let filter = { ISBN: b.ISBN };
    db.collection('week5Lab').deleteOne(filter);
    res.redirect('/listBooks');
});

// Delete Book Within List Books
app.get('/deleteBookByISBN', function (req, res) {
    q = req.query;
    let filter = { ISBN: q.ISBN };
    db.collection('week5Lab').deleteOne(filter);
    res.redirect('/listBooks');
});


// Page Does Not Exist
app.get(/.*/, function (req, res) {
    res.sendFile(__dirname + '/views/404.html');
});

