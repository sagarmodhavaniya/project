const mongoose = require('mongoose');
var PostSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    body: {
        type: String,
        trim: true,
        required: true
    },
    _userId:
    {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true
    }
})
var Post = mongoose.model('Post', PostSchema)
module.exports = { Post }