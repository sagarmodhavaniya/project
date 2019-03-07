/**
 * Model Definition File
 */

/**
 * System and 3rd Party libs
 */
const mongoose = require('mongoose');
const validator = require('validator')
const Schema = mongoose.Schema;
var Mixed = mongoose.Schema.Types.Mixed;
/**
 * Schema Definition
 */

var userSchema = new Schema({

    name: {
        required: true,
        trim: true,
        type: String,
        unique: true
    },
    username: {
        required: true,
        trim: true,
        type: String
    },
    email: {
        required: true,
        trim: true,
        type: String
    },
    address: [{
        street: {
            required: true,
            trim: true,
            type: String
        },
        suite: {
            required: true,
            trim: true,
            type: String
        },
        city: {
            required: true,
            trim: true,
            type: String
        },
        zipcode: {
            required: true,
            trim: true,
            type: Mixed
        },
        geo: [{
            lat: {
                required: true,
                trim: true,
                type: Number
            },
            lng: {
                required: true,
                trim: true,
                type: Number
            }
        }]
    }],
    phone: {
        required: true,
        trim: true,
        type: Mixed
    },
    website: {
        required: true,
        trim: true,
        type: String
    },
    company: [{
        name: {
            required: true,
            trim: true,
            type: String
        },
        catchPhrase: {
            required: true,
            trim: true,
            type: String

        },
        bs: {
            required: true,
            trim: true,
            type: String
        }
    }]


});

userSchema.methods.findByuser = function () {
    var User = this

}

/**
 * Export Schema
 */
var User = mongoose.model('User', userSchema);
module.exports = { User };