/*jslint node: true */
/*jslint nomen: true */
'use strict';

var config = {};

config.server = {};

config.server.host = process.env.SERVER_HOST || 'localhost';
config.server.port = process.env.SERVER_PORT || 3000;

module.exports = config;