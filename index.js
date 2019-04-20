'use strict';

const httpServer = require('./components/httpServer');
const readme = require('./components/readme');
const logger = require('./components/logger');
const application = require('./components/application');
const scheduler = require('./components/scheduler');
const htmlDownloader = require('./components/htmlDownloader');
const htmlParser = require('./components/htmlParser');
const alarmer = require('./components/alarmer');
const build = require('./components/build');
const gateway = require('./components/gateway');
const auth = require('./components/auth');
const env = require('./components/env');

const fx = {
    httpServer,
    readme,
    logger,
    application,
    scheduler,
    htmlDownloader,
    htmlParser,
    alarmer,
    build,
    gateway,
    auth,
    env
};

fx.hooks = {};

fx.addHook = function (hookName, hookFunction) {
    var hookList = fx.hooks[hookName];

    if (hookList) {
        hookList.push(hookFunction);
    } else {
        hookList = [hookFunction];
    }

    fx.hooks[hookName] = hookList;
}

fx.runHook = function (hookName) {
    var hookList = fx.hooks[hookName];

    if (hookList) {
        for (var i = 0; i < hookList.length; i++) {
            var hookFunc = hookList[i];
            hookFunc();
        }
    }
}

fx.run = function () {
    env.display();
    fx.runHook("before_run");
    logger.info('fx', 'Hello,my name is node-core-fx.');
    fx.runHook("after_run");
}

fx.run();

module.exports = fx;