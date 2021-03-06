//
// constants
//
const express = require('express')
const crypto = require('crypto');
const salt = '9f98853fcf7a6cb926e4ead205d2578c';
const bodyParser = require("body-parser");

//
// imports
//
var app = express()
var session = require('express-session')
var dbi = require('./database.js');
var cookieParser = require('cookie-parser');

//
//app initialization
//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'km5(lk%%µKGHIY89%µiOOnnhqn"#', 
  cookie: { maxAge: 60000 },
  resave: true,
  saveUninitialized: true,
  HttpOnly: true,
}))

app.use(cookieParser());
app.use('/images', express.static(__dirname + "/images"));

//Define request response in root URL (/)
app.get('/logout', function (req, res) {
    // free cookies
    res.cookie('email', "", {expires:new Date(0)})
    res.cookie('first_name', "", {expires:new Date(0)})
    res.cookie('last_name', "", {expires:new Date(0)})
    res.cookie('last_login', "", {expires:new Date(0)})
    res.render('index.ejs', {})
});

//Define request response in root URL (/)
app.get('/', function (req, res) {
   var is_auth = req.cookies.email;
   console.log('web.js auth token:' + is_auth)
   var first_name = req.cookies.first_name
   var last_name  = req.cookies.last_name
   var last_login = req.cookies.last_login
   if (is_auth) {
      res.render('auth_ok.ejs',{fullname:first_name +' ' + last_name, lastlogin:last_login})
   }
   else {
      res.render('index.ejs', {})
   }
});

//Define select request in root URL (/login_user)
app.get('/select', function(req, res) {
   var is_auth = req.cookies.email;
   console.log('web.js auth token:' + is_auth)
   if (is_auth) {
      var first_name = req.cookies.first_name
      var last_name  = req.cookies.last_name
      var last_login = req.cookies.last_login
      res.render('select2.ejs',{fullname:first_name +' ' + last_name, lastlogin:last_login})
   }
   else {
      res.render('index.ejs', {})	   
   }
});


//Define login request in root URL (/login_user)
app.post('/login_user', function(req, res) {
   var is_auth = req.cookies.email;
   console.log('web.js auth token:' + is_auth)
   if (is_auth) {
      var first_name = req.cookies.first_name
      var last_name  = req.cookies.last_name
      var last_login = req.cookies.last_login
      res.render('auth_ok.ejs',{fullname:first_name +' ' + last_name, lastlogin:last_login})
   } 
   else {
      var pass = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, `sha512`).toString(`hex`)
      dbi.auth_a_user(dbi.do_auth_a_user, req.body.email, pass, res)
   }
});

//Define signup request in root URL (/signup)
app.get('/signup', function (req, res) {
   var is_auth = req.cookies.email
   var first_name = req.cookies.first_name
   var last_name = req.cookies.last_name
   var last_login = req.cookies.last_login
   console.log('web.js auth token:' + is_auth)
   if (is_auth) {
       res.render('auth_ok.ejs', {fullname:first_name +' ' + last_name, lastlogin:last_login} )
   }
   else {
      res.render('signup.ejs', {});
   }
});

/*
 * when the user save the header text
 */
app.post('/edit_header', function (req, res) {
   var email_auth = req.cookies.email
   var first_name = req.cookies.first_name
   var last_name = req.cookies.last_name
   var last_login = req.cookies.last_login
   if (email_auth) {
     /*
      * save the header text
      */
     dbi.update_article(email_auth, req.body.tittle, 'None', res, dbi.update_article_done);
     console.log('web.js, edit-header, auth token:' + email_auth)
     console.log('web.js, edit-header, tittle:' + req.body.tittle)
     res.setHeader('Content-Type','text/html')
     res.write('MESSAGE_SAVED:OK')
     res.end()
   }else {
     console.log("web.js, edit-header, user not authenticated")
   }
});

app.post('/create_user', function(req, res) {
  var pass = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, `sha512`).toString(`hex`);
  dbi.insert_a_user(dbi.do_insert_a_user, req.body.email, req.body.firstname, req.body.lastname, pass, res);
});


// Access the session as req.session
app.get('/session', function(req, res, next) {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})


//Launch listening server on port 8081
app.listen(8081, function () {
  console.log('app listening on port 8081!')
})
