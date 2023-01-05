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
            url: 'http://100.25.165.74:8000/unikrib/users/login',
            data: JSON.stringify(login_dict),
            contentType: 'application/json',
            dataType: 'json',
            success: function(user_dict) {
                alert(user_dict.first_name + " has successfully logged in");
            },
            error: function() {
                alert("User not found");
            },
        })
    })
})
