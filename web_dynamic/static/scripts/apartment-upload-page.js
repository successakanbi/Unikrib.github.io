#!/usr/bin/node

// Load all environments
$(function() {
    get('/environments')
    .then((items) => {
        $.each(items, function (index, environment){
            $("#community").append('<option value="' + environment.id + '">' + environment.name + '</option>');
        })
    }).catch((err) => {
        errorHandler(err, "Error loading the environments")
    })
})

// Load the streets in the selected environment
$(function() {
    $('#community').on('change', function() {
        const env_id = $("#community :selected").val();
        get('/environments/' + env_id + '/streets')
        .then((streets) => {
            $('#street').html('');
                $.each(streets, function(index, street) {
                    $("#street").append('<option value="' + street.id + '">' + street.name + '</option>');
                })
        }).catch((err) => {
            errorHandler(err, "Could not load the streets in this environment, please reload the page")
        })
    })
})

//Post the inputted apartment details
$(function (){
    const userId = window.localStorage.getItem('newId')
    $("#submit-apart").on('click', function(){
        houseDict = {
            "apartment": $('#apartment :selected').val(),
            "name": $('#name').val(),
            "street_id": $("#street").val(),
            "price": $('#price').val(),
            "running_water": $('#running-water :selected').val(),
            "waste_disposal": $('#adequate-disposal :selected').val(),
            "power_supply": $('#hours').val(),
            "owner_id": userId,
        };
        var ins = $("#Apart-image1")[0].files.length;
        if(ins == 0) {
            alert("First image cannot be empty");
            return;
        }
        var payload = JSON.stringify(houseDict);
        post('/houses', payload)
        .then((house) => {
            alert('Apartment uploaded successfully')
            $(function() {
                // upload first image
                var formData = new FormData();
                var file = $("#Apart-image1")
                formData.append("file", file[0].files[0]);
                formData.append("fileName", house.id + '.jpg');
                formData.append("folder", "apartment-images");
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
                            var payload = JSON.stringify({"image1": body.url});
                            var endpoint = '/houses/' + house.id;
                            put(endpoint, payload)
                            .then(() => {
                                alert("first image uploaded succesfully")
                            })
                        }
                    })
                })
            })
            $(function() {
                // upload second image
                var formData = new FormData();
                var file = $("#Apart-image2")
                var ins = $("#Apart-image2")[0].files.length;
                if(ins == 0) {
                    return;
                }
                formData.append("file", file[0].files[0]);
                formData.append("fileName", house.id + '.jpg');
                formData.append("folder", "apartment-images");
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
                            var payload = JSON.stringify({"image2": body.url});
                            var endpoint = '/houses/' + house.id;
                            put(endpoint, payload)
                            .then(() => {
                                alert("second image uploaded succesfully")
                            })
                        }
                    })
                })
            })
            $(function() {
                // upload third image
                var formData = new FormData();
                var file = $("#Apart-image3");
                var ins = $("#Apart-image3")[0].files.length;
                if(ins == 0) {
                    return;
                }
                formData.append("file", file[0].files[0]);
                formData.append("fileName", house.id + '.jpg');
                formData.append("folder", "apartment-images");
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
                            var payload = JSON.stringify({"image3": body.url});
                            var endpoint = '/houses/' + house.id;
                            put(endpoint, payload)
                            .then(() => {
                                alert("third image uploaded succesfully")
                            })
                        }
                    })
                })
            })
        }).catch((err) => {
            errorHandler(err, "Error uploading the apartment, please try again")
        })
    })
});