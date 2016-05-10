var bcrypt = require('bcryptjs');
var moment = require('moment');
var jwt = require('jwt-simple');

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
        sub: user.id
    };
    return jwt.encode(payload, 'keyboard_cat');
}


module.exports = {
    hashing: hashing,
    comparePassword: comparePassword,
    generateToken: generateToken
};