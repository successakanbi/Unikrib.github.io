#!/usr/bin/node
const userId = window.localStorage.getItem('newId');

//Load the available environments
$(function (){
    get('/environments')
    .then((envs) => {
        $("#community-select").html('')
        $.each(envs, function (index, env){
            $("#community-select").append('<option value="' + env.id + '">' + env.name + '</option>')
        })
    }).catch((err) => {
        errorHandler(err, "Could not load available environments");
    })
})

//Load all the available service categories
$(function (){
    get('/service-categories')
    .then((cats) => {
        $.each(cats, function (index, cat){
            $("#service-select").append('<option value="' + cat.id + '">' + cat.name + '</option>')
        })
    }).catch((err) => {
        errorHandler(err, "Error loading service categories");
    })
})

// Update the user category, avatar and location
$(function (){
    $("#submit").on('click', function (){
        console.log("Updating...")
        var ins = $("#profile-photo")[0].files.length;

        if(ins == 0) {
            alert("Select an image please");
            return;
        }
        var formData = new FormData();
        var file = $("#profile-photo")

        formData.append("file", file[0].files[0]);
        formData.append("fileName", userId + '.jpeg');
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
                    console.log(body);
                    var payload = JSON.stringify({
                        "avatar": body.url,
                        "com_res": $("#community-select :selected").val(),
                        "note": $('#descript-text').val(),
                    })
                    var endpoint = '/users/' + userId
                    put(endpoint, payload)
                    .then(() => {
                        alert("User image successfully uploaded");
                        window.location.href = "image-upload-page.html";
                    }).catch(() => {
                        alert("Error encountered while updating profile image");
                    })
                }
            })
        }).catch((err) => {
            errorHandler(err, "Error encountered while uploading user avatar");
        })
        var payload = JSON.stringify({
            "category_id": $("#service-select :selected").val(),
            "description": $("#descript-text").val(),
            "owner_id": userId,
        })
        post('/services', payload)
        .then((service) => {
            window.localStorage.setItem('serviceId', service.id);
            alert("Details updated successfully");
        }).catch((err) => {
            errorHandler(err, "An error occurred while uploading the service");
        })
    })
})