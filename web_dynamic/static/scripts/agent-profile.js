#!/usr/bin/node
const userId = window.localStorage.getItem('newId');

/* function put(endpoint, payload) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'PUT',
            url: endpoint,
            data: payload,
            contentType: 'application/json',
            dataType: 'json',
            success: function(data) {
                resolve(data);
            },
            error: function(err) {
                reject(err);
            }
        })
    })
}*/

// Load all the available environments
$(function() {
    get('/environments')
    .then((envs) => {
        $.each(envs, function(index, env){
            $('#community-select').append('<option value="' + env.id + '">' + env.name + '</option>')
        })
    })
})

// Update the user info
$(function() {
    $('#submit').on('click', function() {
        userDict = {
            note: $('#descript-text').val(),
            com_res: $('#community-select :selected').val(),
        }
        endpoint = '/users/' + userId;
        payload = JSON.stringify(userDict);
        put(endpoint, payload)
        .then(() => {
            var formData = new FormData();        
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
                        console.log(body)
                        image1 = {
                            "avatar": body.url,
                        }
                        endpoint = JSON.stringify(image1);
                        payload = '/users/' + userId;
                        put(endpoint, payload)
                        .then(() => {
                            alert("Profile image uploaded successfully");
                            window.location.href = 'Apartment-page.html';
                        })
                    }
                })
            })
        })
    }).catch((err) => {
        errorHandler(err, "Could not update the user info");
    })
})