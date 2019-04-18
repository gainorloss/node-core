const express = require('express');
const consolidate = require('consolidate');
const path = require('path');
const auth = require('./auth');

const logger = require('./logger');

const server = express();
server.set('view engine', 'html');
server.set('views', './pages');
server.engine('html', consolidate.ejs);
server.use(express.static(path.join(__dirname, 'public')));
server.use(express.json());

// server.use(function (req, res) {
//     var pathName = url.parse(req.url).pathname;
// });

/**
 * Processes error request.
 * @param {*} req 
 * @param {*} res 
 */
function _returnErr(req, res) {
    logger.err("application", ['get', ' ', req.url, ' ', 'failed'].join(''));//log request failed.
    res.writeHead(404, { 'ContentType': 'text/html;charset=utf8' });
    res.write("404 Not found");
    res.end();
}
const application = {};

/**
 * Starts server.
 * @param host
 * @param port
 */
application.start = function (host, port) {
    //default login.
    server.post('/api/login', function (req, res) {
        logger.warning('application', JSON.stringify(req.body));
        let token = auth.encrypt(req.body);
        res.send({ status: 0, code: 200, msg: 'token获取成功', data: token });
    });
    //default register.
    server.post('/api/register', function (req, res) {

    });
    server.listen(port, host, function () {
        logger.info("application", ["Server started，please visit http://", host, ":", port].join(''));
    });
};

/**
 * get request.
 */
application.get = function (path, callback) {
    server.get(path, callback);
}

/**
 * get request with token.
 */
application.authGet = function (path, callback) {
    server.get(path, function (req, res) {
        let token = req.headers['authorization'].split(' ').pop();
        let obj = auth.decrypt(token);
        logger.warning('application', `token:${token},obj:${obj}`);
        if (!obj) {
            res.end({ status: 1, code: 400, msg: '认证失败，您未获取访问此api的授权', data: null });
            return;
        };
        callback(req, res);
    });
}

/**
 * post request.
 */
application.post = function (path, callback) {
    server.post(path, callback);
}

/**
 * post request with token.
 */
application.authPost = function (path, callback) {
    server.post(path, function (req, res) {
        let token = req.headers['authorization'].split(' ').pop();
        auth.decrypt(token, function (err, obj) {
            if (err) {
                res.end({ status: 1, code: 400, msg: '认证失败，您未获取访问此api的授权', data: null }); 
                return;
            }
            logger.warning('application', `token:${token},obj:${obj}`);
            if (!obj)
            callback(req, res);
        });
       
    });
}

module.exports = application;