const mongoose = require('mongoose');
var PhotoSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    url:{
        type: mongoose.Schema.Types.Mixed,
        trim: true,
        required: true
    },
    _albumId:
    {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true

    },
    thumbnailUrl: {
        type: mongoose.Schema.Types.Mixed,
        trim: true,
        required: true
    }
})


var Photo = mongoose.model('Photo', PhotoSchema)
module.exports = { Photo }