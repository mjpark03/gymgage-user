/*jslint browser: true*/
/*global $, io, console, jQuery*/
/*jslint nomen: true*/

$(function() {
  	'use strict';

  	$('#workout').click(function(e){
		e.preventDefault();
		$('#workoutForm').submit();
	});

	var socket = io.connect('http://localhost:3000');

	socket.on('workout-count',function(data){
		$('#count_set1_val').html(data.count);
    });

});