/*jslint node: true */
/*jslint nomen: true */
'use strict';

// 
var http = require('http');
var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var logger = require('winston');

var app = express();

//
// global.config = require('./config.js');

//
app.set('view engine', 'jade');
app.set('views', './views');

//
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({
   extended: true
 }));
app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'text/html' }));


var server = http.createServer(app);

var io = require('socket.io')(server);
var socket;

server.listen(3000, function(){
	console.log('App started');
});

io.on('connection', function(socketObj){
	
	console.log('app.js socket.io connection');
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