const http = require('http');
const logger = require('./logger');
const url = require('url');
const path = require('path');
const fs = require('fs');

function _createServer(callback) {

}
const httpServer = {
    handlers: {
        '/api/values': function (req) {
            return ['value1','value2']
        }
    }
};

/**
 * processes different routes.
 * @param route request route
 * @param callback process request
 */
httpServer.addHandlers = function (route, callback) {
    if (typeof callback === 'function') {
        httpServer.handlers[route] = callback;
    }
}

/**
 * 
 * Starts http server listened to a address.
 * @param host 
 * @param port
 */
httpServer.start = function (host, port) {
    http.createServer(function (req, res) {

        var pathName = url.parse(req.url).pathname;

        if (pathName.indexOf('/api') == 0) {
            res.setHeader("ContentType", "text/json;charset=utf8");

            if (typeof httpServer.handlers[pathName] === 'function') {
                logger.warning(['get/json', ' ', req.url, ' ', 'success'].join(''));//log request success.
                var json = httpServer.handlers[pathName](req);
                res.write(JSON.stringify({
                    status:0,
                    code:100,
                    msg:'',
                    data:json
                }));
                res.end();
            } else {
                _returnErr(req, res);
            }
        } else {
            res.setHeader("ContentType", "text/html;charset=utf8");

            var templatePath = path.join(__dirname, "../../../src/pages", [pathName, '.html'].join(''));
            fs.readFile(templatePath, function (err, data) {
                if (err) {
                    _returnErr(req, res);
                } else {
                    logger.warning(['get', ' ', req.url, ' ', 'success'].join(''));//log request success.
                    res.write(data);
                    res.end();
                }
            });
        }
    }).listen(port, host, function () {
        logger.warning("Server started，please visit http:localhost:3000");
    });
}

function _returnErr(req, res) {
    logger.err(['get', ' ', req.url, ' ', 'failed'].join(''));//log request failed.
    res.writeHead(404, { 'ContentType': 'text/html;charset=utf8' });
    res.write("404 Not found");
    res.end();
}
module.exports = httpServer;