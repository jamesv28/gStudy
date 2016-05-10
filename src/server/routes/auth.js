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

module.exports = router;