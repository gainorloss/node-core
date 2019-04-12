const http = require('http');

function _createServer(callback) {
    const httpServer = http.createServer(function (req, res) {
        res.setHeader("ContentType", "text/html;charset=utf8");

        callback(res);//response callback.
    });
    httpServer.listen(3000, "localhost");
}

const fx = {
    httpServer: {},
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
    console.log('Hello,my name is node-core-fx.');
    fx.runHook("after_run");
}

fx.httpServer.write = function (html) {
    _createServer(function (res) {
        res.end(html);
    });
}

fx.run();

module.exports = fx;