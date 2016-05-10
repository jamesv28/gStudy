var bcrypt = require('bcryptjs');
var moment = require('moment');
var jwt = require('jwt-simple');

function ensureAdmin(req, res, next) {
    // check headers for the presence of an auth object
    if(!(req.headers && req.headers.authorization)) {
        return res.status(400).json({
            status: 'fail',
            message: 'No header present or no authorization header.'
        });
    }
    // decode the token
    var header = req.headers.authorization.split(' ');
    var token = header[1];
    var payload = jwt.decode(token, config.TOKEN_SECRET);
    var now = moment().unix();
    // ensure that it is valid
    if(now > payload.exp || payload.iat > now || user.role != 'admin') {
        return res.status(401).json({
            status: 'fail',
            message: 'Token is invalid'
        });
    }
    // ensure user is still in the database
    knex('users')
        .where('id', payload.sub)
        .first()
        .then(function(user) {
            // if in database, let them access the route
            next();
        })
        .catch(function(err) {
            return next(err);
        });
}

function hashing(password) {
    return bcrypt.hashSync(password, 10);
}

function comparePassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
}

function generateToken(user) {
    var payload = {
        exp: moment().add(14, 'days').unix(),
        iat: moment().unix(),
        sub: user._id
    };
    return jwt.encode(payload, process.env.TOKEN_SECRET);
}


module.exports = {
    ensureAdmin: ensureAdmin,
    hashing: hashing,
    comparePassword: comparePassword,
    generateToken: generateToken
};