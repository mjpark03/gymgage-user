/*jslint node: true */
/*jslint nomen: true */
'use strict';

/*
	global module

	by Rachel
*/
module.exports = function(app, bodyParser, logger, socket){

	logger.log('info', 'controller - index - module.exports');

	require('./workout')(app, bodyParser, logger, socket);
	require('./api')(app, bodyParser, logger);
};