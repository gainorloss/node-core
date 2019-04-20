const logger = require('./logger');
const env = {
    argv: process.argv,
    argv0: process.argv0,
    execArgv: process.execArgv,
    execPath: process.execPath,
    envVariables: process.cwd()
};
env.display = () => {
    logger.info('env', env.argv);
    logger.info('env', env.envVariables);
}
module.exports = env;