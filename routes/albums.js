const express = require('express');
const router = express.Router();
const request = require('request')
const { Albums } = require('../models/albums.model')
var { User } = require('../models/user.model')
// var {authentication} =require('./../middleware/authentication')
router.post('/user/albums', (req, res, next) => {
    var id = req.header('x-auth');
    User.find({ _id: id }).then((result) => {
        if (!result) {
            return Promise.reject();
        }
        request({
            url: 'https://jsonplaceholder.typicode.com/albums',
            json: true
        }, (albumsRequest, albumsResponce, albumsEroor) => {
            for (var i = 0; i < 10; i++) {
                var albums = new Albums({
                    title: albumsResponce.body[i].title,
                    _userId: id
                });

                albums.save().then((result) => {
                    console.log(result)
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

router.get('/user/albums', (req, res, next) => {
    albums.find({
    }).then((result)=>{
        res.send(result)
    }).catch((e)=>{
        console.log(e)
        res.status(404).send(e);
    })
    })

    router.get('/user/:id/albums', (req, res, next) => {
        var id = req.params.id;
        albums.find({
            _userId:id
        }).then((result)=>{
            res.send(result)
        }).catch((e)=>{
            console.log(e)
            res.status(404).send(e);
        })
        })
    

    router.delete('/user/:id/albums', (req, res, next) => {
        var id = req.params.id;
        albums.findOneAndRemove({
            _userId: id
        }).then((result) => {
         
            res.send(result)
        }).catch((e) => {
            console.log(e)
            res.status(404).send(e);
        })
    })
    router.patch('/user/:id/post', (req, res, next) => {
        var id = req.params.id;
        albums.findOneAndUpdate({
          title:req.body.title
        },{returnNewDocument:true}).then((result) => {
         
            res.send(result)
        }).catch((e) => {
            console.log(e)
            res.status(404).send(e);
        })
    })

module.exports = router