#!/usr/bin/node

//Load the available environments
$(function (){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8000/unikrib/environments',
        data: {},
        contentType: 'application/json',
        dataType: 'json',
        success: function (envs){
            $("#community-select").html('')
            $.each(envs, function (index, env){
                $("#community-select").append('<option value="' + env.id + '">' + env.name + '</option>')
            })
        }
    })
})

// Update the user category and location
$(function (){
    $("#submit").on('click', function (){
        const userId = window.localStorage.getItem('newId');
        var ins = $("#profile-photo")[0].files.length;

        if(ins == 0) {
            alert("Select an image please");
            return;
        }
        var spDict = {
            "service_category": $("#service-select :selected").val(),
            "com_res": $("#community-select :selected").val(),
        };

        $.ajax({
            type: 'PUT',
            url: 'http://localhost:8000/unikrib/users/' + userId,
            data: JSON.stringify(spDict),
            contentType: 'application/json',
            dataType: 'json',
            success: function(data){
                alert("User details updated successfully");
                var formData = new FormData();
                var file = $("#profile-photo")

                formData.append("file", file[0].files[0]);
                formData.append("fileName", userId + '.jpeg');
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
                                console.log(body);
                                userDict = {
                                    "avatar": body.url,
                                }
                                $.ajax({
                                    type: 'PUT',
                                    url: 'http://localhost:8000/users/' + userId,
                                    data: JSON.stringify(userDict),
                                    contentType: 'application/json',
                                    dataType: 'json',
                                    success: function (){
                                        alert("User details successfully updated");
                                    },
                                    error: function (){
                                        alert("Error encountered while updating profile image");
                                    }
                                })
                                window.location.href = 'Apartment-page.html';
                            },
                            error: function (jqxhr, text, error) {
                                console.log(error);
                            }
                        });
                    },
                    error: function(response) {
                        alert(response.message);
                    },
                });
            },
            error: function(){
                alert("Error uploading user details");
            }
        })
    })
})