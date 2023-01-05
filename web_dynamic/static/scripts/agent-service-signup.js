#!/usr/bin/node

$(function (){
	var $first_name = $("#first_name");
	var $last_name = $("#last_name");
	var $email = $("#email");
	var $phone_no = $("#phone_no");
	var $password = $("#input-pass");
	var $user_type = $("#account-type-input").text();

	$("#submit").on('click', function() {
		alert($user_type.value)
		user_dict = {
			"first_name": $first_name.val(),
			"last_name": $last_name.val(),
			"email": $email.val(),
			"phone_no": $phone_no.val(),
			"password": $password.val(),
			"user_type": $user_type,
		};

		$.ajax({
			type: 'POST',
			url: 'http://100.25.165.74:8000/unikrib/users',
			data: JSON.stringify(user_dict),
			contentType: 'application/json',
			dataType: 'json',
			success: function(new_dict) {
				alert(new_dict.first_name + " account has been created successfully.");
			},
			error: function (){
				alert("An error has occured, please try again later");
			},
		});
	});
});
