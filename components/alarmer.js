const logger = require('./logger');
const request = require('request');
const qs=require('querystring');
const alarmer = {
    serverChainKey: 'SCU48970T598563b88da57b90420a32531fdda7575cb55d7fb3904'
};

/**
 * Alarm administrator.
 * @param msg
 * @param title
 */
alarmer.alarmAdmin = function (msg, title) {
    if (!title)
        title = '告警';

    var url = ["https://sc.ftqq.com/", alarmer.serverChainKey, ".send?text=", qs.escape(title), "&desp=",  qs.escape(msg)].join('');
    let options = {
        method: 'get',
        url: url,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    request(options, function (err, res, body) {
        if (err) {
            logger.err("alarmer",err.message);
            return;
        };
        logger.info("alarmer","Server酱告警成功！");
    })
}

module.exports = alarmer;