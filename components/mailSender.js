const mailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const ejs=require('ejs');

const logger = require('./logger');

const mailSender = {};

const template=ejs.compile(fs.readFileSync(path.resolve(__dirname,"templates/email.ejs"),"utf8"));

mailSender.sendMail = function (to, subject,desc) {
    let transport = mailer.createTransport({
        service: 'qq',
        port: 465,
        secureConnection: false,
        auth: {
            user: '519564415@qq.com',
            pass: 'xollwmwczuxwbhcb'
        }
    });
    const from='zhangjian519564415@qq.com';
    let mailOptions = {
        from: from,
        to: to,
        subject: subject,
        html: template({
            title:subject,
            desc:desc,
            to:to,
            from:from
        })
    };
    transport.sendMail(mailOptions, (err, info) => {
        if (err) {
            logger.err('mailSender', err.message);
            return;
        };
        logger.info('mailSender',`邮件发送成功,${JSON.stringify(info)}`);
    });
}

module.exports = mailSender;