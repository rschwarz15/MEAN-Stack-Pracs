const mongoose = require('mongoose');
const moment = require('moment');

function deleteEmpty(v) {
    if (v == null || v == "") {
        return undefined;
    }
    return v;
}

let bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Week6LabAuthor'
    },
    isbn: {
        type: String,
        validate: {
            validator: function (isbnValue) {
                return isbnValue.length == 13;
            },
            message: 'ISBN must be 13 characters'
        },
    },
    dop: {
        type: Date,
        get: function(value) {
            return moment(value).format('DD-MM-YY');
        },
        default: Date.now
    },
    summary: {
        type: String,
        set: deleteEmpty
    }
});

module.exports = mongoose.model('Week6LabBook', bookSchema);