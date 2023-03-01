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
    var avatar = false
    $('#profile-photo').on('change', function() {
        avatar = true
    })
    $('#submit').on('click', function(){
        userDict = {
            first_name: $('#fname').val(),
            last_name: $('#lname').val(),
            phone_no: $('#phone').val(),
            com_res: $('#community-select :selected').val(),
            note: $('#descript-text').val(),
        }
        if (avatar === false) {
            $.ajax({
                type: 'PUT',
                url: 'http://localhost:8000/unikrib/users/' + userId,
                data: JSON.stringify(userDict),
                contentType: 'application/json',
                dataType: 'json',
                success: function(user) {
                    alert("Details updated successfully")
                    getUserType()
                },
                error: function() {
                    alert("An error occured, please try again")
                }
            })
        } else {
            var formData = new FormData();
            var ins = $("#profile-photo")[0].files.length;
            if(ins == 0) {
                return;
            }
            var file = $("#profile-photo");
            formData.append("file", file[0].files[0]);
            formData.append("fileName", userId + '.jpg');
            formData.append("folder", "user_avatar");
            formData.append('publicKey', 'public_YHk4EswEnK3KjAlQgpJBaxbP/FY=');
                
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8003/unikrib/auth-url',
                dataType: 'json',
                success: function(body) {
                    formData.append("signature", body.signature);
                    formData.append("expire", body.expire);
                    formData.append("token", body.token);
                
                    $.ajax({
                        url: 'https://upload.imagekit.io/api/v1/files/upload',
                        type: 'POST',
                        mimeType: "multipart/form-data",
                        dataType: 'json',
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function(body) {
                            userDict["avatar"] = body.url
                            $.ajax({
                                type: 'PUT',
                                url: 'http://localhost:8000/unikrib/users/' + userId,
                                data: JSON.stringify(userDict),
                                contentType: 'application/json',
                                dataType: 'json',
                                success: function(user) {
                                    alert("Profile image updated successfully")
                                    getUserType()
                                },
                                error: function() {
                                    alert("An error occured, please try again")
                                }
                            })
                        }
                    })
                },
                error: function() {
                    alert("Error, could not get authentication parameter")
                }
            })
        }
    })
})