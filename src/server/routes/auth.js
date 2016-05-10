var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var helpers = require('./helpers');

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


router.post('/login', function (req, res, next) {
    Users().select().where('email', req.body.email)
        .then(function (user) {
            console.log('this is a user', user);
            bcrypt.compare(req.body.password, user[0].password, function (err, match) {
                if (err) {
                    return next(err);
                }
                next();
            })
        }).catch(function (err) {
            console.log('i am an error', err);
    })
});
module.exports = router;