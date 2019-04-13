const chalk = require('chalk');

/**
 * used to log the program output and trace.
 * @param debug
 * @param info
 * @param warning
 * @param err
 */
const logger = {};

/**
 * 
 * log by the type of debug.
 * @param msg 
 */
logger.debug = function (msg) {
    var time=__getCurrentTime();

    var output=['[',time,' ','info',']',':',msg].join('');
    console.log(output);
}

/**
 * 
 * log by the type of info.
 * @param msg 
 */
logger.info = function (msg) {
    var time=__getCurrentTime();

    var output=['[',time,' ',chalk.green('info'),']',':',chalk.green(msg)].join('');
    console.log(output);
}

/**
 * 
 * log by the type of warning.
 * @param msg 
 */
logger.warning = function (msg) {
    var time=__getCurrentTime();

    var output=['[',time,' ',chalk.yellow('warning'),']',':',chalk.yellow(msg)].join('');
    console.log(output);
}

/**
 * 
 * log by the type of err.
 * @param msg 
 */
logger.err = function (msg) {
    var time=__getCurrentTime();

    var output=['[',time,' ',chalk.red('err'),']',':',chalk.red(msg)].join('');
    console.log(output);
}

function __getCurrentTime(){
    return new Date().toLocaleTimeString();
}

module.exports=logger;