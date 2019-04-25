const express = require('express');
const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser');
const http = require('http');
const path = require('path');
const logger = require('./logger');

const app = express();
app.set('views', path.join(__dirname, "views"));
app.set('view engine', "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const server = http.createServer(app);
const mvc = {};

/**
 * Starts server.
 * @param host
 * @param port
 */
mvc.start = function (host, port) {
    server.listen(port, host, function () {
        logger.info("application", ["Server started，please visit http://", host, ":", port].join(''));
    });
};
module.exports = mvc;