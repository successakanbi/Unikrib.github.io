#!/usr/bin/node
const userId = window.localStorage.getItem('newId')


// Populate the page with the existing user info
$(function() {
    get('/users/' + userId)
    .then((user) => {
        $('#fname').val(user.first_name);
        $('#lname').val(user.last_name);
        $('#phone').val(user.phone_no);
        $('#descript-text').val(user.note)
        $("#prof-img").html("<img id='avatar' src='" + user.avatar + "'>")
        get('/environments')
        .then((envs) => {
            $.each(envs, function(index, env){
                if (user.com_res === env.id){
                    $('#community-select').append('<option value="' + env.id + '" selected>' + env.name + '</option>')
                } else {
                    $('#community-select').append('<option value="' + env.id + '">' + env.name + '</option>')
                }
            })
        })
    }).catch((err) => {
        errorHandler(err, "Could not load user info")
    })
})

// Update the user info
$(function() {
    var avatar = false
    $('#profile-photo').on('change', function() {
        avatar = true
    })
    $('#submit').on('click', function(){
        var payload = JSON.stringify({
            first_name: $('#fname').val(),
            last_name: $('#lname').val(),
            phone_no: $('#phone').val(),
            com_res: $('#community-select :selected').val(),
            note: $('#descript-text').val(),
        })
        var endpoint = '/users/' + userId;
        if (avatar === false) {
            put(endpoint, payload)
            .then(() => {
                alert("Details updated successfully")
                getUserType()
            }).catch((err) => {
                errorHandler(err, "Could not update details, please try again")
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

            getAuth()
            .then((body) => {
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
                        payload["avatar"] = body.url
                        put(endpoint, payload)
                        .then(() => {
                            alert("Profile image updated successfully")
                            getUserType()
                        }).catch((err) => {
                            errorHandler(err, "Could not upload the profile image, please try again");
                        })
                    }
                })
            }).catch(() => {
                alert("Could not obtain authentication parameters");
            })
        }
    })
})