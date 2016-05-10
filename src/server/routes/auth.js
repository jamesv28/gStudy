var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var helpers = require('./helpers');

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
                        password: hashedPassword,
                    })
                    .then(function(data) {
                        console.log('here3');
                        var token = helpers.generateToken(user);
                        delete user.password;
                        res.status(200).json({
                            status: 'success',
                            data: {
                                token: token,
                                user: user
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

module.exports = router;