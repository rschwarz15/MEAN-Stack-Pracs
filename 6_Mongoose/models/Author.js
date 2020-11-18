const mongoose = require('mongoose');
const moment = require('moment');

function deleteEmpty(v) {
    if (v == null || v == "") {
        return undefined;
    }
    return v;
}

let authorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            set: deleteEmpty
        }
    },
    dob: {
        type: Date,
        get: function(value) {
            if (value) {
                return moment(value).format('DD-MM-YY');
            }
        },
        set: deleteEmpty,
        validate: {
            validator: function (value) {
                now = new Date();
                return (value < now);
            },
            message: 'Date should not be in the future'
        }
    },
    address: {
        state: {
            type: String,
            validate: {
                validator: function (stateVaue) {
                    return stateVaue.length >= 2 && stateVaue.length <= 3;
                },
                message: 'State string has min 2, max 3 characters'
            }
        },
        suburb: {
            type: String,
            set: deleteEmpty
        },
        street: {
            type: String,
            set: deleteEmpty
        },
        unit: {
            type: String,
            set: deleteEmpty
        }
    },
    numBooks: { type: Number, min: 1, max: 150 }, 
});

module.exports = mongoose.model('Week6LabAuthor', authorSchema);