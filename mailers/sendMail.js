var nodemailer = require('nodemailer');

// Assumes we use gmail
var transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE, 
    port: process.env.MAIL_PORT,
    auth: { 
        user: process.env.MAIL_USERNAME, //ToDo añadir email a proccess.env
        pass: process.env.MAIL_PASSWORD  //ToDo añadir password a proccess.env
    }
});

module.exports = (mailOptions) => {
  transporter.sendMail(mailOptions, function(err, info) {
   if(err) { 
        console.log(err); 
        console.log('Errors occurred.'); 
    } else { 
        console.log('Mail sent successfully'); 
    } 
    return null;
  });
};