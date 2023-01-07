#!/usr/bin/node

$(function() {
    var $firstname = $("#first_name");
    var $lastname = $("#last_name");
    var $email = $('#email');
    var $phone_no = $("#phone_no");
    var $password = $('#input-pass');

    $("#submit").on('click', function () {
        user_dict = {
            "first_name": $firstname.val(),
            "last_name": $lastname.val(),
            "email": $email.val(),
            "phone_no": $phone_no.val(),
            "password": $password.val(),
            "user_type": "regular",
        }
        $.ajax({
            type: 'POST',
            url: 'http://100.25.165.74:8000/unikrib/users',  // to be editted later
            data: JSON.stringify(user_dict),
            contentType: 'application/json',
            dataType: 'json',
            success: function (new_user){
                alert("User successfully created.");
            },
            error: function(xhr, status, message){
		    if (xhr.status === 401){
			    alert("Please include an email");
		    }else if (xhr.status === 405){
			    alert("Please include a password");
		    } else if (xhr.status === 403){
			    alert("That is an invalid email, please use a correct one");
		    } else if (xhr.status === 404) {
			    alert("Email has already been registered, please use another one");
		    }
            },
        })
    })
})
