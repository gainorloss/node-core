const httpProxy = require('http-proxy');
const logger = require('./logger');


proxy = httpProxy.createProxyServer();
proxy.on('err', function (err, req, res) {
    let msg = `gateway started err:${err.message}`;
    logger.err('gateway', msg);
    res.end(msg);
});

const gateway = {
    host: {
        "www.test.com": 'http://localhost:3000'
    }
};


gateway.rProxy = function (req, res) {
    let host = req.headers['host'].split(':')[0];
    if (gateway.hosts[host]) {
        proxy.web(req, res, { target: hosts[host] });
    }
}
module.exports = gateway;