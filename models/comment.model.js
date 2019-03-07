const mongoose = require('mongoose');
var CommentSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true
    },
    email: {
        type: String,
        trim: true,
        require: true
    },
    body: {
        type: String,
        trim: true,
        require: true
    },
    _postId: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        require: true
    }
})

var Comment = mongoose.model('Comment', CommentSchema)
module.exports = { Comment }