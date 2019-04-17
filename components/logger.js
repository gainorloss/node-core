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
logger.debug = function (type,msg) {
    var time=__getCurrentTime();

    var output=['[',time,' ','debug',']',chalk.blue(type),':',msg].join('');
    console.log(output);
}

/**
 * 
 * log by the type of info.
 * @param msg 
 */
logger.info = function (type,msg) {
    var time=__getCurrentTime();

    var output=['[',time,' ',chalk.green('info'),']',chalk.blue(type),':',chalk.green(msg)].join('');
    console.log(output);
}

/**
 * 
 * log by the type of warning.
 * @param msg 
 */
logger.warning = function (type,msg) {
    var time=__getCurrentTime();

    var output=['[',time,' ',chalk.yellow('warning'),']',chalk.blue(type),':',chalk.yellow(msg)].join('');
    console.log(output);
}

/**
 * 
 * log by the type of err.
 * @param msg 
 */
logger.err = function (type,msg) {
    var time=__getCurrentTime();

    var output=['[',time,' ',chalk.red('err'),']',chalk.blue(type),':',chalk.red(msg)].join('');
    console.log(output);
}

function __getCurrentTime(){
    return new Date().toLocaleTimeString();
}

module.exports=logger;