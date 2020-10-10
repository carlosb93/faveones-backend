var fs = require('fs'),
    path = require('path'),
    Handlebars = require('handlebars'),
    sendMail = require('../sendMail');

// Open template file
var source = fs.readFileSync(path.join(__dirname, '../templates/emailPassConfirm.html.hbs'), 'utf8');
// Create email generator
var template = Handlebars.compile(source);

var options = (email, locals) => {
  return {
    from: process.env.MAIL_FROM_NAME,
    to: email,
    subject: process.env.APP_NAME + ' | Password Confirmation', //ToDo añadir nombre de app a procces.env
    html: template(locals) // Process template with locals - {resetPasswordToken}
  };
};

module.exports = (user) => {
  var link = process.env.APP_URL + "/auth";
  var name = user['username'];
  return sendMail(options(email = user['email'], link = {name, link}));
}