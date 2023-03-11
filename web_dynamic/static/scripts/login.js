#!/usr/bin/node

$(function() {
    $("#submit").on('click', function() {
        var payload = JSON.stringify({
            "email": $("#username").val(),
            "password": $("#input-pass").val(),
        })
        post('/auth/login', payload)
        .then((user_dict) => {
            console.log("Succesfully logged in")
            alert("Welcome back " + user_dict.first_name)
            cookie = getCookie('_my_session_id')
            alert("Cookie: " + cookie);
            window.localStorage.setItem('newId', user_dict.id);
            if (user_dict.user_type === 'vendor') {
                window.location.href = 'product-page.html';
            } else if (user_dict.user_type === 'sp') {
                window.location.href = 'service-page.html'
            } else {
                window.location.href = 'Apartment-page.html';
            }
        }).catch((err) => {
            errorHandler(err, "Could not log in")
        })
    })
})

$(function () {
	$("#sign-up").on('click', function() {
		window.location.href = "reset-password.html";
	});
});
