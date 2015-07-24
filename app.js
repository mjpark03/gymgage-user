/*jslint node: true */
/*jslint nomen: true */
'use strict';

var http = require('http');
var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var logger = require('winston');

// Configuration
global.config = require('./config.js');

// 1. Create application through express
var app = express();

app.set('view engine', 'jade');
app.set('views', './views');

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({
   extended: true
 }));
app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'text/html' }));

// 2. Create server & socket.io
var port = global.config.server.port;
var host = global.config.server.host;
var server = http.createServer(app);
var io = require('socket.io')(server);
var socket;

server.listen(port, host, function(){
	logger.log('info', 'GYMGAGE - user app started');
});

io.on('connection', function(socketObj){
	
	logger.log('info', 'app.js socket.io connection');

	socket = socketObj;
	require('./controllers')(app, bodyParser, logger, socket);
});

//
// var models = require('./models');
// require('./controllers')(app, bodyParser, logger, socket);

// 
app.get('/', function(req, res){
	res.render('main');
});