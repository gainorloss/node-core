const httpProxy = require('http-proxy');
const logger = require('./logger');

/**
 * 
 */
class gateway {
    proxy=null;
    host={
        "www.test.com":'http://localhost:3000'
    }
    constructor(){
        this.proxy = httpProxy.createProxyServer();
        this.proxy.on('err', function (err, req, res) {
            let msg = `gateway started err:${err.message}`;
            logger.err('gateway',msg);
            res.end(msg);
        });
    }
    /**
     * Starts gateway.
     * @param {*} host 
     * @param {*} port 
     */
    rProxy(req,res) {
        let host = req.headers['host'].split(':')[0];
        if(hosts[host]){
            this.proxy.web(req,res,{target:hosts[host]});
        }
    }
}
export default gateway;