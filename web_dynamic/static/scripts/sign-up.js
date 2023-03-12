#!/usr/bin/node

$(function() {
    var $firstname = $("#first_name");
    var $lastname = $("#last_name");
    var $email = $('#email');
    var $phone_no = $("#phone_no");
    var $password = $('#input-pass');

    $("#submit").on('click', function () {
        var payload = JSON.stringify({
            "first_name": $firstname.val(),
            "last_name": $lastname.val(),
            "email": $email.val(),
            "phone_no": $phone_no.val(),
            "password": $password.val(),
            "user_type": "regular",
        })

        post('/users', payload)
        .then((new_user) => {
            alert("User successfully created.");
    	    window.localStorage.setItem('newId', new_user.id);
	    	window.location.href = "user-profile.html"
        }).catch((err) => {
            errorHandler(err, "Could not create user, please try again");
        })
    })
})
