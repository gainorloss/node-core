const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const url = require('url');
const auth = require('./auth');
const logger = require('./logger');

const app = express();
app.use(bodyParser.json());
//authentication middleware.
app.use(function (req, res, next) {
    var pathName = url.parse(req.url).pathname;
    logger.info('application', `url:${req.url},pathname:${pathName}`);
    if (pathName === '/api/login' || pathName === '/api/register') {
        next();
    } else {
        if (!req.headers['authorization']) {
            res.send({ status: 1, code: 400, msg: '认证失败，您未获取访问此api的授权' });
            return;
        };
        let token = req.headers['authorization'].split(' ').pop();
        let obj = auth.decrypt(token);
        logger.warning('application', `token:${token},obj:${obj}`);
        if (!obj) {
            res.send({ status: 1, code: 400, msg: '认证失败，您未获取访问此api的授权' });
            return;
        };
        next();
    }
});
//error middleware.
app.use(function (err, req, res, next) {
    if (err) {
        logger.err("application", `get ${req.url} failed`);
        res.send({ status: 1, code: 500, msg: "服务器异常，请联系管理员" });
        return;
    };
    next();
});
//default login.
app.post('/api/login', function (req, res) {
    logger.warning('application', JSON.stringify(req.body));
    let token = auth.encrypt(req.body);
    res.send({ status: 0, code: 200, msg: 'token获取成功', data: token });
});
//default register.
app.post('/api/register', function (req, res) {

});


const server = http.createServer(app);
const application = {};

/**
 * Starts server.
 * @param host
 * @param port
 */
application.start = function (host, port) {

    server.listen(port, host, function () {
        logger.info("application", ["Server started，please visit http://", host, ":", port].join(''));
    });
};

/**
 * get request.
 */
application.get = function (path, callback) {
    app.get(path, callback);
}

/**
 * post request.
 */
application.post = function (path, callback) {
    app.post(path, callback);
}
module.exports = application;