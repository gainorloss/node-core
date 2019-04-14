'use strict';

const httpServer=require('./components/httpServer');
const readme=require('./components/readme');
const logger=require('./components/logger');
const application=require('./components/application');
const scheduler=require('./components/scheduler');
const htmlDownloader=require('./components/htmlDownloader');
const htmlParser=require('./components/htmlParser');

const fx = {
    httpServer,
    readme,
    logger,
    application,
    scheduler,
    htmlDownloader,
    htmlParser

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
    fx.runHook("before_run");
    logger.info('Hello,my name is node-core-fx.');
    fx.runHook("after_run");
}

fx.run();

module.exports = fx;