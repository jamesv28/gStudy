var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var helpers = require('./helpers');
var bcrypt = require('bcrypt');

function Users() {
    return knex('users');
}

router.post('/register', function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    knex('users').where('email', email)
        .then(function(data) {
            if(data.length) {
                return res.status(409).json({
                    status: 'fail',
                    message: 'Email already exists'
                });
            } else {
                var hashedPassword = helpers.hashing(password);
                knex('users')
                    .returning('*')
                    .insert({
                        email: email,
                        password: hashedPassword
                    })
                    .then(function(data) {
                        console.log(data);
                        var token = helpers.generateToken(data[0]);
                        delete data.password;
                        res.status(200).json({
                            status: 'success',
                            data: {
                                token: token,
                                user: data
                            }
                        });
                    })
                    .catch(function(err) {
                        console.log('inside error', err);
                        return next(err);
                    });
            }
        })
        .catch(function(err){
            console.log('outside error', err);
            return next(err);
        });
});


router.post('/login', function (req, res, next) {
    // ensure that user exists
    console.log('email', req.body.email);
    Users().select().where('email', req.body.email)
        .then(function (user) {
            console.log('user details', user);
            if (!user[0]) {
                return res.status(401).json({
                    status: 'fail',
                    message: 'Email does not exist',
                    requestBody: req.body
                });
            } else
            if ( !req.body.password ) {
                return res.status(401).json({
                    status: 'fail',
                    message: 'Missing password.',
                    requestBody: req.body
                });
            }
            delete user[0].password;
            var token = helpers.generateToken(user[0]);
            res.status(200).json({
                status: 'success',
                data: {
                    token: token,
                    user: user[0]
                }
            });
        })
        .catch(function (err) {
            return next(err);
        });
});
module.exports = router;