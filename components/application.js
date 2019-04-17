const express=require('express');
const consolidate=require('consolidate');
const path=require('path');

const logger=require('./logger');

const server=express();
server.set('view engine','html');
server.set('views','./pages');
server.engine('html',consolidate.ejs);
server.use(express.static(path.join(__dirname,'public')));
server.use(function(req,res){
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

/**
 * Processes error request.
 * @param {*} req 
 * @param {*} res 
 */
function _returnErr(req, res) {
    logger.err("application",['get', ' ', req.url, ' ', 'failed'].join(''));//log request failed.
    res.writeHead(404, { 'ContentType': 'text/html;charset=utf8' });
    res.write("404 Not found");
    res.end();
}
const application={};

/**
 * Starts server.
 * @param host
 * @param port
 */
application.start=function(host,port){
    server.listen(port,host,function (){
        logger.info("application",["Server started，please visit http://",host,":",port].join(''));
    });
};

module.exports=application;