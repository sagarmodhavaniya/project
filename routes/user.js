/**
 * Router Configuration Files
 */

/**
 * System and 3rd party libs
 */
const express = require('express');
const router = express.Router();
const request = require('request')
var { User } = require('../models/user.model')
/**
 * Router Definitions
 */
router.post('/user', function (req, res, next) {
    request({
        url: 'https://jsonplaceholder.typicode.com/users',
        json: true
    }, (userrequest, userresponce, error) => {
        for (var i = 0; i < 10; i++) {
            var user = new User(userresponce.body[i])
            user.save().then((result) => {
                res.send(result)
            }, (err) => {
                res.send(err)
            })
        }
    })
});

/**
 * Export Router
 */
module.exports = router;
