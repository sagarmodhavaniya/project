const mongoose = require('mongoose');
var AlbumsSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true
    }
})
var Albums = mongoose.model('Albums', AlbumsSchema)
module.exports = { Albums }