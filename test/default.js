
var assert = require('assert');

var request = require('request');

describe('Server Connection', function(){

	it('# Port Connection', function(done){
		request.get('http://localhost:3000', function(error, response, body){
			assert.equal('200', response.statusCode);
			done();
		});
	});
});