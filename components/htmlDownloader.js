const request = require('superagent');
const logger = require('./logger');

const htmlDownloader = {};



/**
 * Gets html content.
 * @param {*} url 
 */
htmlDownloader.getHtmlContent = function (url, headers,callback) {
    var req = request.get(url);
    if (headers) {
        for (var key in headers) {
            req = req.set(key, header[key]);
        }
    }
    req.retry(2)
       .then(res => {
        logger.info("htmlDownloader",res.text);
        callback(res.text);
       })
       .catch(function (err) {
            logger.err("htmlDownloader",['doanloader:', 'download', url, ' ', 'failed',',','err:',err.message].join(''));
        });
}

module.exports=htmlDownloader;