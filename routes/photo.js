const express = require('express');
const router = express.Router();
const request = require('request')
const { Albums } = require('../models/albums.model')
const { Photo } = require('../models/photos.model')
router.post('/user/photo', (req, res, next) => {
    try {
        request({
            url: 'https://jsonplaceholder.typicode.com/photos',
            json: true
        }, (photoRequest, photoResponce, error) => {

            Albums.find({}).then((result) => {

                for (var i = 0; i < 5000; i++) {
                    var photo = new Photo({
                        title: photoResponce.body[i].title,
                        url: photoResponce.body[i].url,
                        thumbnailUrl: photoResponce.body[i].thumbnailUrl,
                        _albumId: result[i]._id
                    })
                    photo.save().then((photoresult) => {
                        console.log(photoresult)
                        res.status(201).send()
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
router.get('/user/photo', (req, res, next) => {
    var id = req.header('x-auth')

    Photo.find({
    }).then((result) => {
        res.send(result)
    }).catch((e) => {
        console.log(e)
        res.status(404).send(e);
    })
})

    router.get('/user/:id/photo', (req, res, next) => {
        var id = req.params.id;
        Photo.find({
            _albumId:id
        }).then((result)=>{
            // console.log(result[0]._id)
            res.send(result)
        }).catch((e)=>{
            console.log(e)
            res.status(404).send(e);
        })
        })
    

    router.delete('/user/:id/photo', (req, res, next) => {
        var id = req.params.id;
        Photo.findOneAndRemove({
            _albumId: id
        }).then((result) => {
         
            res.send(result)
        }).catch((e) => {
            console.log(e)
            res.status(404).send(e);
        })
    })
    router.patch('/user/:id/photo', (req, res, next) => {
        var id = req.params.id;
        Photo.findOneAndUpdate({
          title:req.body.title,
          url:req.body.url,
          thumbnailUrl:req.body.thumbnailUrl
        },{returnNewDocument:true}).then((result) => {
         
            res.send(result)
        }).catch((e) => {
            console.log(e)
            res.status(404).send(e);
        })
    })


module.exports = router