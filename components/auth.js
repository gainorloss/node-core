const jwt = require('jsonwebtoken');

const auth = {
    secret: 'node-dev-fx-application'
}

/**
* encrypt.
* @param {*} obj 
*/
auth.encrypt = function (obj) {
    if (!obj) return null;

    return jwt.sign(obj, auth.secret);
}

/**
* decrypt.
* @param {*} token 
*/
auth.decrypt = function (token, callback) {
    if (!token) return null;
    return jwt.verify(token, auth.secret, callback);
}
module.exports = auth;