const express = require('express');
const router = express.Router();
const request = require('request')
const { Post } = require('../models/post.model')
const { Comment } = require('../models/comment.model')
router.post('/user/comment', (req, res, next) => {
    try {
        request({
            url: 'https://jsonplaceholder.typicode.com/comments',
            json: true
        }, (commentRequest, commentResponce, error) => {

            Post.find({}).then((result) => {
commentResponce.body.push({_postId:result})
                for (var i = 0; i < 500; i++) {
                    var comment = new Comment({
                        name: commentResponce.body[i].name,
                        email: commentResponce.body[i].email,
                        body: commentResponce.body[i].body,
                        _postId:result[i]._id
                    })

                    comment.save().then((commentresult) => {
                          console.log(commentresult)
                    }, (e) => {
                        console.log(e)
                        res.send(e)

                    })

                }
            }, (err) => {
                console.log(err)
                res.send(err)
            })

        })
    }
    catch (e) {
        console.error(e)
        res.send(e)
    }
})
router.get('/user/comment', (req, res, next) => {
    Comment.find({
    }).then((result)=>{
        res.send(result)
    }).catch((e)=>{
        console.log(e)
        res.status(404).send(e);
    })
    })

    router.get('/user/:id/comment', (req, res, next) => {
        var id = req.params.id;
      
        Comment.find({
            _postId:id
        }).then((result)=>{
    
            res.send(result)
        }).catch((e)=>{
            console.log(e)
            res.status(404).send(e);
        })
        })

    router.delete('/user/:id/comment', (req, res, next) => {
        var id = req.params.id;
        Comment.findOneAndRemove({
            _postId: id
        }).then((result) => {
         
            res.send(result)
        }).catch((e) => {
            console.log(e)
            res.status(404).send(e);
        })
    })
    router.patch('/user/:id/comment', (req, res, next) => {
        var id = req.params.id;
        Comment.findOneAndUpdate({
          body:req.body.body,
          name:req.body.name,
          email:req.body.email
        },{returnNewDocument:true}).then((result) => {
         
            res.send(result)
        }).catch((e) => {
            console.log(e)
            res.status(404).send(e);
        })
    })

module.exports = router