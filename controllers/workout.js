/*jslint node: true */
/*jslint nomen: true */
'use strict';

var logger;
var socket;
var count = 0;

/*

*/

var showWorkout = function(req, res) {

	logger.log('controllers - workout - showWorkout');

	res.render('workout');
};

var increaseCount = function(req, res) {

	logger.log('info', 'controllers - workout - increaseCount');

	count++;
	logger.log('info', 'workout count: ' + count);

	socket.emit('workout-count', {count: count});

	res.json({status: 'success'});
};

module.exports = function(app, bodyParser, loggerObj, socketObj){

	logger = loggerObj;
	socket = socketObj;

	logger.log('info', 'controller - workout - module.exports');

	app.get('/workout', showWorkout);
	app.post('/workout/count', increaseCount);
};