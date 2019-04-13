const http = require('http');
const logger = require('./logger');
const url = require('url');
const path = require('path');
const fs = require('fs');

const httpServer = {
    handlers: {
        '/api/values': function (req) {
            return ['value1', 'value2']
        }
    },
    socketIOHandlers: {
        '/send': function (paras) {
            logger.info(['socket.io:', '/chat', ' ', JSON.stringify(paras)].join(''));
        }
    }
};

/**
 * processes different routes.
 * @param route request route
 * @param callback process request
 */
httpServer.addHandler = function (route, callback) {
    if (typeof callback === 'function') {
        httpServer.handlers[route] = callback;
    }
}

/**
 * processes different signalr routes.
 * @param method request route
 * @param callback process request
 */
httpServer.addSocketIOHandler = function (method, callback) {
    if (typeof callback === 'function') {
        httpServer.socketIOHandlers[method] = callback;
    }
}

/**
 * 
 * Starts http server listened to a address.
 * @param host 
 * @param port
 */
httpServer.start = function (host, port) {
    var server = http.createServer(function (req, res) {

        var pathName = url.parse(req.url).pathname;

        if (pathName.indexOf('/api') == 0) {
            res.setHeader("ContentType", "text/json;charset=utf8");

            if (typeof httpServer.handlers[pathName] === 'function') {
                logger.warning(['get/json', ' ', req.url, ' ', 'success'].join(''));//log request success.
                var json = httpServer.handlers[pathName](req);
                res.write(JSON.stringify({
                    status: 0,
                    code: 100,
                    msg: '',
                    data: json
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
    });

    const io = require('socket.io')(server);

    io.on("connection", client => {
        if (httpServer.socketIOHandlers) {
            for (var key in httpServer.socketIOHandlers) {
                if (key && typeof httpServer.socketIOHandlers[key] === 'function') {
                    client.on(key, httpServer.socketIOHandlers[key]);
                }
            }
        }
    });

    server.listen(port, host, function () {
        logger.warning(["Server started，please visit http://",host,':',port].join(''));
        logger.info('Socket.io server started,url:/connection');
    })
}

function _returnErr(req, res) {
    logger.err(['get', ' ', req.url, ' ', 'failed'].join(''));//log request failed.
    res.writeHead(404, { 'ContentType': 'text/html;charset=utf8' });
    res.write("404 Not found");
    res.end();
}
module.exports = httpServer;