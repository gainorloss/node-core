const schedule = require('node-schedule');
const logger = require('./logger');

const scheduler = {
    jobs: []
};

/**
 * Adds schedule job.
 * @param cronExpression
 * @param callback
 */
scheduler.addJob = function (name, cronExpression, callback) {
    if (typeof callback === 'function') {
        scheduler.jobs.push({
            name,
            cron: cronExpression,
            callback
        });
    }
}

/**
 * Schedules job.
 * @param cronExpression
 * @param callback
 */
scheduler.run = function () {
    if (scheduler.jobs) {
        logger.warning("scheduler",["当前待调度任务",scheduler.jobs.length,"个"].join(''))
        for (var key in scheduler.jobs) {
            var job = scheduler.jobs[key];
            logger.info("scheduler",["任务",job['name'],":",job['cron']].join(''));
            schedule.scheduleJob(job['cron'],job['callback']);
        }
    }
}

module.exports = scheduler;