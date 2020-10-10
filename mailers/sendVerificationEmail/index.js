var fs = require('fs'),
    path = require('path'),
    Handlebars = require('handlebars'),
    sendMail = require('../sendMail');

// Open template file
var source = fs.readFileSync(path.join(__dirname, '../templates/emailvalidation.html.hbs'), 'utf8');
// Create email generator
var template = Handlebars.compile(source);

var options = (email, locals) => {
  return {
    from: process.env.MAIL_FROM_NAME,
    to: email,
    subject: process.env.APP_NAME + ' | Email Verification', //ToDo añadir nombre de app a procces.env
    html: template(locals) // Process template with locals - {resetPasswordToken}
  };
};

module.exports = (user) => {
  var resetPasswordToken = process.env.APP_URL + "/auth/verify/" + user['resetPasswordToken']; //ToDo añadir url de frontend a procces.env 
  var name = user['username'];
  return sendMail(options(email = user['email'], resetPasswordToken = {name, resetPasswordToken}));
}