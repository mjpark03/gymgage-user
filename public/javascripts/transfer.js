/*jslint browser: true*/
/*global $, io, console, jQuery*/
/*jslint nomen: true*/

$(function() {
  'use strict';

  	var getCsrfToken = function() {
  		var csrfToken = $( "input[name*='_csrf']" ).val();

  		var csrf = document.createElement('input');
      	csrf.setAttribute('type', 'hidden');
      	csrf.setAttribute('name', '_csrf');
      	csrf.setAttribute('value', csrfToken);

      	return csrf;
  	};

  	var getNewForm = function(method, action) {
  		var form = document.createElement('form');
      	form.setAttribute('method', method);
      	form.setAttribute('action', action);

      	return form;
  	};

	// 
	$("input#from_size").change(function() {

		$.ajax({
	        url: "/exchange/rate",
	        type: "GET",
	        success: function(data) {
	          	var to_size = data.krw * $("input#from_size").val();
  				$("input#to_size").val(to_size);
	        },
	        error: function() { },
	        complete: function() { },
	        dataType: "json"
	    });
  	});

	//
	$('#noMember').click(function(e) {
		e.preventDefault();
		$('#register').modal('show');
		$('#memberCheck').modal('hide');
	});

	//
	$('#member').click(function(e){
		e.preventDefault();
		$('#login').modal('show');
		$('#memberCheck').modal('hide');
	});

	//
	$('#a_login').click(function(e){
		e.preventDefault();
		$('#type').val('');
		$('#login').modal('show');
	});

	//
	$('#a_logout').click(function(e){
		e.preventDefault();
		window.location = '/logout';
		return false;
	});

	//
	$('#a_signup').click(function(e){
		e.preventDefault();
		$('#register').modal('show');
	});

	//
	$('#a_settings').click(function(e){
		e.preventDefault();

		var userIdVal = $('#userId').val();
		
  		var form = getNewForm('post', '/user/settings');
      	form.appendChild(getCsrfToken());
      	document.body.appendChild(form);
		form.submit();
	});

	//
	$('#a_limits').click(function(e){
		e.preventDefault();

		var userIdVal = $('#userId').val();

      	var form = getNewForm('post', '/user/limits');
      	form.appendChild(getCsrfToken());
      	document.body.appendChild(form);
		form.submit();
	});

	//
	$('#a_contacts').click(function(e){
		e.preventDefault();

      	var form = getNewForm('post', '/user/contacts');
      	form.appendChild(getCsrfToken());
      	document.body.appendChild(form);
		form.submit();
	});

	//
	$('#a_main').click(function(e){
		e.preventDefault();
		var userIdVal = $('#userId').val();

  		var form = getNewForm('post', '/');
      	form.appendChild(getCsrfToken());
      	document.body.appendChild(form);
		form.submit();
	});

	//
	$('#a_forgot_password').click(function(e){
		e.preventDefault();

      	var form = getNewForm('post', '/user/settings');
      	form.appendChild(getCsrfToken());
      	document.body.appendChild(form);
		form.submit();
	});

	//
	$('#btn_login').click(function(e){
		e.preventDefault();

		$.ajax({
	        url: "/login/check",
	        type: "POST",
	        data: $('#loginForm').serialize(),
	        success: function(data) {
	          if (data.status === 'success') {
	          	var fromSize = $('#from_size').val();
				var toSize = $('#to_size').val();
				var fromNation = $('#from_nation').val();
				var toNation = $('#to_nation').val();

				var inputFromSize = $('<input>').attr('type', 'hidden').attr('name', 'from_size').val(fromSize);
				var inputToSize = $('<input>').attr('type', 'hidden').attr('name', 'to_size').val(toSize);
				var inputFromNation = $('<input>').attr('type', 'hidden').attr('name', 'from_nation').val(fromNation);
				var inputToNation = $('<input>').attr('type', 'hidden').attr('name', 'to_nation').val(toNation);

				$('#loginForm').append($(inputFromSize));
				$('#loginForm').append($(inputToSize));
				$('#loginForm').append($(inputFromNation));
				$('#loginForm').append($(inputToNation));
				$('#loginForm').submit();
	          } else { 
	          	$('#p_login_error').html('email or password is wrong.');
	          }
	        },
	        error: function() { },
	        complete: function() { },
	        dataType: "json"
	    });


	});

	//
	$('#btn_register').click(function(e){
		e.preventDefault();

		$.ajax({
	        url: "/register/email/verify",
	        type: "POST",
	        data: $('#registerForm').serialize(),
	        success: function(data) {
	          if (data.status === 'success') {
	          	$('#registerForm').submit();
	          } else { 
	          	$('#p_register_email').html('email is already exist.');
	          }
	        },
	        error: function() { },
	        complete: function() { },
	        dataType: "json"
	    });
	});

	//
	$('#btn_send_sms').click(function(e){
		$.ajax({
	        url: "/register/phone",
	        type: "POST",
	        data: $('#phoneRegisterForm').serialize(),
	        success: function(data) {
	          if (data.status === 'success') {
	          	$('#phoneVerifyDiv').show();
	          	$('#btn_send_sms').attr('disabled', true);
	          } else { }
	        },
	        error: function() { },
	        complete: function() { },
	        dataType: "json"
	    });
	});

	//
	$('#btn_verify_sms').click(function(e){
		e.preventDefault();
		
		if($('.verify_sms').length <= 0){
			var userId = $('#userId').val();
			var inputUserId = $('<input>').attr('type', 'hidden').attr('name', 'userId').attr('class', 'verify_sms').val(userId);
			$('#phoneVerifyForm').append($(inputUserId));
		}
		
		$.ajax({
	        url: "/register/phone/verify",
	        type: "POST",
	        data: $('#phoneVerifyForm').serialize(),
	        success: function(data) {
	          if (data.status === 'success') {

	          	var form = getNewForm('post', '/loginResult');

	          	var userId = document.createElement('input');
	          	userId.setAttribute('type', 'hidden');
	          	userId.setAttribute('name', 'userId');
	          	userId.setAttribute('value', data.userId);
	          	form.appendChild(userId);

	          	form.appendChild(getCsrfToken());
	          	document.body.appendChild(form);
    			form.submit();
	          } else { 
	          	alert('invalid sms code');
	          }
	        },
	        error: function() { },
	        complete: function() { },
	        dataType: "json"
	    });
	});

	//
	$('#btn_passport').click(function(e){
		e.preventDefault();
		$('#proofPassportForm').submit();
	});

	//
	$('#btn_address').click(function(e){
		e.preventDefault();
		$('#proofAddressIdForm').submit();
	});

	//
	$('#address_file').change(function(e){
		e.preventDefault();
	});

	//
	$('#passport_file').change(function(e){
		e.preventDefault();

		$('#p_photoId').html($('#passport_file').val());
	});

	//
	$('#address_file').change(function(e){
		e.preventDefault();

		$('#p_addressId').html($('#address_file').val());
	});

	//
	$('table tr.clickable').on("click", function() {
	    var transferId = $(this).attr('id');

	    $('#transferId').val(transferId);
	    $('#detailForm').submit();
	});

	//
	$('#verify_photo').click(function(e){
		e.preventDefault();
		var userIdVal = $('#userId').val();
		
  		var form = getNewForm('post', '/user/photoId');
      	form.appendChild(getCsrfToken());
      	document.body.appendChild(form);
		form.submit();
	});

	//
	$('#verify_address').click(function(e){
		e.preventDefault();
		var userIdVal = $('#userId').val();

      	var form = getNewForm('post', '/user/addressId');
      	form.appendChild(getCsrfToken());
      	document.body.appendChild(form);
		form.submit();
	});

	//
	$('#btn_change_password').click(function(e){
		e.preventDefault(); 

		$.ajax({
	        url: "/user/settings/password",
	        type: "POST",
	        data: $('#settingsForm').serialize(),
	        success: function(data) {
	          if (data.status === 'success') {
	          	$('#p_change_password').html('You should check your email.');
	          } else { 
	          	$('#p_change_password').html('Fail to send email. Retry later.');
	          }
	        },
	        error: function() { },
	        complete: function() { },
	        dataType: "json"
	    });
	});

	//
	$('#btn_reset_password').click(function(e){
		e.preventDefault(); 

		$.ajax({
	        url: "/user/settings/password",
	        type: "POST",
	        data: $('#resetEmailForm').serialize(),
	        success: function(data) {
	          if (data.status === 'success') {
	          	$('#p_change_password').html('You should check your email.');
	          } else { 
	          	$('#p_change_password').html('Fail to send email. Retry later.');
	          }
	        },
	        error: function() { },
	        complete: function() { },
	        dataType: "json"
	    });
	});

	//
	$('table tr a.contact_payment').on("click", function() {
	    var recipientId = $(this).attr('id');

	    $('#recipientId').val(recipientId);
	    $('#contactsForm').submit();
	});

	//
	$('table tr a.contact_delete').on("click", function() {
	    var deleteId = $(this).attr('id');
	    
	    $('#deleteId').val(deleteId);
	    $('#deleteContactForm').submit();
	});

});