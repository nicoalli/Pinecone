'use strict';

//setup all the variables needed
var express = require('express');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

var server = require('http').Server(app);
var session = require('express-session');
var routes = require('./routes/index.routes');
var auth = require('./controllers/authentication.controller');

//Set up default db connection and create error handlers

var mongoDB = "mongodb://csc309:pinecone36@ds145790.mlab.com:45790/heroku_j2s5nfh9";
//var mongoDB = "mongodb://localhost/PineconeDB";
mongoose.connect(mongoDB);
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

//database models
var Rooms = require('./models/Room');
var Users = require('./models/User');
var Buildings = require('./models/Building');

// Set views path, template engine, and default layout
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

// Serve directory for css/js/images
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/'));

// Set up to use a session
app.use(session({
    secret: 'super_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// The request body is received on GET or POST.
// This middleware just simplifies things a bit.
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({   // to support URL-encoded bodies
    extended: true
}));

// Definition of Routing of back-ends.
app.use('/api', routes);

// Landing page
app.get('/', auth.isLoggedIn);

// Logout
app.get('/logout', function(req, res){
    if ('name' in req.session){
        req.session.destroy();
        res.render('pages/logout');
    } else {
        res.render('pages/login');
    }
});

var port = process.env.PORT || 3000;
server.listen(port, function() {
    console.log("App is running on port " + port);
});
/*var server = app.listen(3000, function() {
  console.log('Running on 127.0.0.1:%s', server.address().port);
});*/
