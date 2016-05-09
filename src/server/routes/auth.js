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
                        name: name
                    })
                    .then(function(data) {
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
                        return next(err);
                    });
            }
        })
        .catch(function(err){
            return next(err);
        });
});