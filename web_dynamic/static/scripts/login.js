#!/usr/bin/node

$(function () {
    var $email = $("#username");
    var $password = $("#input-pass");

    $("#submit").on('click', function() {
        login_dict = {
            "email": $email.val(),
            "password": $password.val(),
        };
        $.ajax({
            type: 'POST',
            url: 'http://54.173.52.4:8000/unikrib/users/login',
            data: JSON.stringify(login_dict),
            contentType: 'application/json',
            dataType: 'json',
            success: function(user_dict) {
                alert("Welcome back " + user_dict.first_name);
            },
            error: function() {
                alert("You have entered incorrect details, Please try again.");
            },
        })
    })
})

$(function () {
	$("#sign-up").on('click', function() {
		window.location.href = "reset-password.html";
	});
});
