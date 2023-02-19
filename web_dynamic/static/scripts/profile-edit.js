#!/usr/bin/node
const userId = window.localStorage.getItem('newId')


// Populate the page with the existing user info
$(function() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8000/unikrib/users/' + userId,
        contentType: 'application/json',
        dataType: 'json',
        success: function(user) {
            $('#fname').val(user.first_name);
            $('#lname').val(user.last_name);
            $('#phone').val(user.phone_no);
            $('#descript-text').val(user.note)
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8000/unikrib/environments',
                contentType: 'application/json',
                dataType: 'json',
                success: function(envs) {
                    $.each(envs, function(index, env){
                        if (user.com_res === env.id){
                            $('#community-select').append('<option value="' + env.id + '" selected>' + env.name + '</option>')
                        } else {
                            $('#community-select').append('<option value="' + env.id + '">' + env.name + '</option>')
                        }
                        
                    })
                }
            })
        }
    })
})

// Update the user info
$(function() {
    $('#submit').on('click', function(){
        userDict = {
            first_name: $('#fname').val(),
            last_name: $('#lname').val(),
            phone_no: $('#phone').val(),
            com_res: $('#community-select :selected').val(),
            note: $('#descript-text').val()
        }
        $.ajax({
            type: 'PUT',
            url: 'http://localhost:8000/unikrib/users/' + userId,
            data: JSON.stringify(userDict),
            contentType: 'application/json',
            dataType: 'json',
            success: function(user) {
                alert("Details updated successfully")
                window.history.back()
            },
            error: function() {
                alert("An error occured, please try again")
            }
        })
    })
})