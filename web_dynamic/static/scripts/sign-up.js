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
            url: 'http://localhost:8000/unikrib/users',
            data: JSON.stringify(user_dict),
            contentType: 'application/json',
            dataType: 'json',
            success: function (new_user){
		        alert("User successfully created.");
    		    window.localStorage.setItem('newId', new_user.id);
	    	    window.location.href = "user-profile.html"
            },
            error: function(response){
		    alert(response.message);
            },
        })
    })
})
