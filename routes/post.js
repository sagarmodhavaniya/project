const express = require('express');
const router = express.Router();
const request = require('request')
var { Post } = require('../models/post.model')
var { User } = require('../models/user.model')
var count = null
// var {authentication} =require('./../middleware/authentication')
router.post('/user/post', (req, res, next) => {
    var id = req.header('x-auth');
    User.find({ _id: id }).then((result) => {
        if (!result) {
            return Promise.reject();
        }
        request({
            url: 'https://jsonplaceholder.typicode.com/posts',
            json: true
        }, (postRequest, postResponce, postEroor) => {
            for (var i = 0; i < 10; i++) {
                var post = new Post({
                    title: postResponce.body[i].title,
                    body: postResponce.body[i].body,
                    _userId: id
                });

                post.save().then((result) => {
                    res.send(result)
                }, (error) => {
                    res.send(error)
                })
            }

        })
        res.send(result)
        next();
    }).catch((e) => {
        console.log(e)
        res.status(404).send();
    })
})

router.get('/user/:id/post', (req, res, next) => {
    var id = req.params.id;
        Post.find({
        _userId: id
    }).then((result) => {
    
        res.send(result)
    }).catch((e) => {
        console.log(e)
        res.status(404).send(e);
    })
})
router.get('/user/post', (req, res, next) => {

    Post.find({}).then((result) => {

        res.send(result)
    }).catch((e) => {
        console.log(e)
        res.status(404).send(e);
    })
})
router.delete('/user/:id/post', (req, res, next) => {
    var id = req.params.id;
        Post.findOneAndRemove({
        _id: id
    }).then((result) => {
     
        res.send(result)
    }).catch((e) => {
        console.log(e)
        res.status(404).send(e);
    })
})
router.patch('/user/:id/post', (req, res, next) => {
    var id = req.params.id;
        Post.findOneAndUpdate({
      body:req.body.body,
      title:req.body.title
    },{returnNewDocument:true}).then((result) => {
     
        res.send(result)
    }).catch((e) => {
        console.log(e)
        res.status(404).send(e);
    })
})
module.exports = router