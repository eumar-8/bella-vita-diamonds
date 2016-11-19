var express = require('express'),
	mailer = require('express-mailer'),
  bodyParser = require('body-parser');

var app = express();
mailer.extend(app, {
  from: 'bella.vita.diamonds@gmail.com',
  host: 'smtp.gmail.com',
  secureConnection: true, 
  port: 465, 
  transportMethod: 'SMTP', 
  auth: {
    user: 'bella.vita.diamonds@gmail.com',
    pass: 'Rick&Jose'
  }
});

//view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.static('public'));

app.post('/contact-request', function (req, res, next) {
  app.mailer.send('email', {
    to: 'bella.vita.diamonds@gmail.com',
    subject: '-- New Contact Request --', 
    email: req.body.email,
    name: req.body.name,
    message: req.body.message,
  }, function (err) {
    if (err) {
      // handle error 
      console.log(err);
      res.send('There was an error sending the email');
      return;
    }
    res.send('Email Sent');
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});