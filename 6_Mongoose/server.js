//Import packages
const express = require("express");
const mongoose = require('mongoose');
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

//reference to the database
let db;

// Retrieve the Author and Book models
const Author = require('./models/Author');
const Book = require('./models/Book');

//Connect to mongoDB server
const url = "mongodb://localhost:27017/fit2095db";
mongoose.connect.db.dropDatabase();
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err) {
        console.log("Err  ", err);
    } else {
        console.log("Connected successfully to server");
    }
});


// Home
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

// Add Author
app.get('/addAuthor', function (req, res) {
    res.sendFile(__dirname + '/views/addAuthor.html');
});

app.post('/addauthordata', function (req, res) {
    let b = req.body;
    var author = new Author({
        _id: new mongoose.Types.ObjectId(),
        name: { firstName: b.firstName, lastName: b.lastName },
        dob: b.dob,
        address: { state: b.state, suburb: b.suburb, street: b.street, unit: b.unit },
        numBooks: b.numBooks
    })
    author.save(function (err) {
        if (err) {
            console.log(`Err: \n ${err}`);
            res.redirect('/addAuthor');
        } else {
            res.redirect('/listAuthors');
        }
    });
});

// List All Authors
app.get('/listAuthors', function (req, res) {
    Author.find({}, function (err, docs) {
        res.render('listAuthors', { authorDb: docs });
    });
});

// Update Author
app.get('/updateAuthor', function (req, res) {
    res.sendFile(__dirname + '/views/updateAuthor.html');
});

app.post('/updateauthordata', function (req, res) {
    let b = req.body;
    update = { $set: { numBooks: b.numBooks } };
    Author.findByIdAndUpdate(b.id, update, function (err, doc) {
        if (err) {
            console.log(`Err: \n ${err}`);
            res.redirect('updateAuthor');
        } else {
            res.redirect('/listAuthors');
        }
    });
})

// Add Book
app.get('/addBook', function (req, res) {
    res.sendFile(__dirname + '/views/addBook.html');
});

app.post('/addbookdata', function (req, res) {
    let b = req.body;

    var book = new Book({
        _id: new mongoose.Types.ObjectId(),
        title: b.title,
        author: new mongoose.Types.ObjectId(b.author),
        isbn: b.isbn, dop: b.dop, summary: b.summary
    })

    book.save(function (err) {
        if (err) {
            console.log(`Err: \n ${err}`);
            res.redirect('/addBook');
        }
        else {
            // If the book was added succesfully then increment the authors book count      
            filter = { _id: new mongoose.Types.ObjectId(b.author) };
            update = { $inc: { numBooks: 1 } };
            Author.updateOne(filter, update, function (err, doc) { if (err) console.log(`Err: \n ${err}`) });
            res.redirect('/listBooks');
        }
    });
});

// List All Books
app.get('/listBooks', function (req, res) {
    Book.find({}).populate('author').exec(function (err, docs) {
        console.log(docs);
        res.render('listBooks', { bookDb: docs });
    });
});

// Delete Book
app.get('/deleteBook', function (req, res) {
    res.sendFile(__dirname + '/views/deleteBook.html');
});

app.post('/deletebookdata', function (req, res) {
    let b = req.body;
    filter = { isbn: b.isbn };
    Book.deleteOne(filter, function (err, doc) {
        if (err) {
            console.log(`Err: \n ${err}`);
            res.redirect('/deleteBook');
        }
    });
    res.redirect('/listBooks');
});

// Page Does Not Exist
app.get(/.*/, function (req, res) {
    res.sendFile(__dirname + '/views/404.html');
});

