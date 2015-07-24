/*jslint browser: true*/
/*global $, io, console, jQuery*/
/*jslint nomen: true*/

$(function() {
  	'use strict';

  	// move workout view
  	$('#workout').click(function(e){
		e.preventDefault();
		$('#workoutForm').submit();
	});

  	// socket.io connection
	var socket = io.connect('localhost:3000');

	// 1. receive workout count info from server
	socket.on('workout-count',function(data){
		
		// 2. change workout count info in view
		$('#count_set1_val').html(data.count);
    });

});