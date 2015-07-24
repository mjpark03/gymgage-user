/*jslint node: true */
/*jslint nomen: true */
'use strict';

var logger;

/*
	API test

	by Rachel
*/
var testGetData = function(req, res) {

	logger.log('info', 'controllers - api - testGetData');
	logger.log('info', 'received message: ' + req.body.message);

	res.json({status: 'success'});
};

module.exports = function(app, bodyParser, loggerObj){

	logger = loggerObj;
	logger.log('info', 'controller - api - module.exports');

	app.post('/test/getData', testGetData);
};