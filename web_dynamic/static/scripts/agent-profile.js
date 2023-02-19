#!/usr/bin/node
const userId = window.localStorage.getItem('newId');

// Load all the available environments
$.ajax({
    type: 'GET',
    url: 'http://localhost:8000/unikrib/environments',
    contentType: 'application/json',
    dataType: 'json',
    success: function (envs){
        $.each(envs, function(index, env){
            $('#community-select').append('<option value="' + env.id + '">' + env.name + '</option>')
        })
    }
})

// Updates the user info
$(function(){
    $('#submit').on('click', function(){
        userDict = {
            note: $('#descript-text').val(),
            com_res: $('#community-select :selected').val(),
        }
        $.ajax({
            type: 'PUT',
            url: 'http://localhost:8000/unikrib/users/' + userId,
            data: JSON.stringify(userDict),
            contentType: 'application/json',
            dataType: 'json',
            success: function(){
                // Upload image
                $(function (){
                    var formData = new FormData();
                            
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
                                    image1 = {
                                        "avatar": body.url,
                                        "fileId": body.fileId,
                                    }
                                    $.ajax({
                                        type: 'PUT',
                                        url: 'http://localhost:8000/unikrib/users/' + userId,
                                        data: JSON.stringify(image1),
                                        contentType: 'application/json',
                                        dataType: 'json',
                                        success: function(){
                                            alert("Profile image uploaded successfully");
                                        },
                                        error: function(){
                                            alert("Error uploading the profile image");
                                        }
                                    })                                    
                                },
                            });
                        },
                    });
                });
                alert("Details updated successfully")
                window.location.href = 'Apartment-page.html';
            }
        })
    })
})