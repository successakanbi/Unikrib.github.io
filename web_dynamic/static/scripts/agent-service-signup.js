#!/usr/bin/node

// Post the user details
$(function (){
	var $first_name = $("#first_name");
	var $last_name = $("#last_name");
	var $email = $("#email");
	var $phone_no = $("#phone_no");
	var $password = $("#input-pass");

	$("#submit").on('click', function() {
		var user_type = $("#account-type-input :selected").val()
		user_dict = {
			"first_name": $first_name.val(),
			"last_name": $last_name.val(),
			"email": $email.val(),
			"phone_no": $phone_no.val(),
			"password": $password.val(),
			"user_type": user_type
		};

		$.ajax({
			type: 'POST',
			url: 'http://localhost:8000/unikrib/users',
			data: JSON.stringify(user_dict),
			contentType: 'application/json',
			dataType: 'json',
			success: function(new_dict) {
				alert(new_dict.first_name + " account has been created successfully.");
				window.localStorage.setItem('newId', new_dict.id);
				if (user_type === 'sp'){
					window.location.href = 'service-profile.html';
				} else if (user_type === 'agent'){
					window.location.href = 'agent-profile.html'
				} else {
					window.location.href = 'user-profile.html';
				}
			},
			error: function (){
				alert("An error has occured, please try again later");
			},
		});
	});
});
