#!/usr/bin/node
const houseId = window.localStorage.getItem('houseId')

// Load the apartment details
$(function() {
    get('/houses/' + houseId)
    .then((house) => {
        if (house.apartment === 'Single-room') {
            $('#apartment').append('<option value="Single-Room" selected>Single Room</option>')
        } else {
            $('#apartment').append('<option value="Single-Room">Single Room</option>')
        }
        if (house.apartment === 'Self-contain') {
            $('#apartment').append('<option value="Single-contain" selected>Self-contain</option>')
        } else {
            $('#apartment').append('<option value="Single-contain">Self-contain</option>')
        }
        if (house.apartment === 'One-bedroom') {
            $('#apartment').append('<option value="One-bedroom" selected>One bedroom flat</option>')
        } else {
            $('#apartment').append('<option value="One-bedroom">One bedroom flat</option>')
        }
        if (house.apartment === 'Two-bedroom') {
            $('#apartment').append('<option value="Two-bedroom" selected>Two bedroom flat</option>')
        } else {
            $('#apartment').append('<option value="Two-bedroom">Two bedroom flat</option>')
        }
        if (house.apartment === 'Three-bedroom') {
            $('#apartment').append('<option value="Three-bedroom" selected>Three bedroom flat</option>')
        } else {
            $('#apartment').append('<option value="Three-bedroom">Three bedroom flat</option>')
        }

        $('#name').val(house.name)
        var price = parseInt(house.price)
        $('#price').val(price)
        $('#hours').val(house.power_supply)

        if (house.running_water === 'yes') {
            $('#running-water').append('<option value="yes" selected>Yes</option>')
        } else {
            $('#running-water').append('<option value="yes">Yes</option>')
        }
        if (house.running_water === 'no') {
            $('#running-water').append('<option value="no" selected>No</option>')
        } else {
            $('#running-water').append('<option value="nO">No</option>')
        }

        if (house.waste_disposal === 'yes') {
            $('#Adequate-disposal').append('<option value="yes" selected>Yes</option>')
        } else {
            $('#Adequate-disposal').append('<option value="yes">Yes</option>')
        }
        if (house.waste_disposal === 'no') {
            $('#Adequate-disposal').append('<option value="no" selected>No</option>')
        } else {
            $('#Adequate-disposal').append('<option value="nO">No</option>')
        }

        $('#Image1').html('<img id="image1" src="' + house.image1 + '">')
        $('#Image2').html('<img id="image2" src="' + house.image2 + '">')
        $('#Image3').html('<img id="image3" src="' + house.image3 + '">')
        get('/streets/' + house.street_id)
        .then((street) => {
            get('/environments/' + street.env_id)
            .then((env) => {
                get('/environments')
                .then((envs) => {
                    $.each(envs, function(index, item){
                        if (item.name === env.name) {
                            $('#community').append('<option value="' + env.id + '" selected>' + env.name + '</option>')
                        } else {
                            $('#community').append('<option value="' + item.id + '">' + item.name + '</option>')
                        }
                    })
                    get('/environments/' + env.id + '/streets')
                    .then((strs) => {
                        $.each(strs, function (index, str){
                            if (str.name === street.name){
                                $('#street').append('<option value="' + street.id + '" selected>' + street.name + '</option>')
                            } else {
                                $("#street").append('<option value="' + str.id + '">' + str.name + '</option>')
                            }
                        })
                    })
                })
            })
        })
    }).catch((err) => {
        errorHandler(err, "Could not load the apartment details");
    })
})

// Load the corresponding streets when the community is changed
$(function() {
    $('#community').on('change', function() {
        var env = $('#community :selected').val();
        get('/environments/' + env + '/streets')
        .then((strs) => {
            $('#street').html('')
            $.each(strs, function(index, str){
                $('#street').append('<option value="' + str.id + '">' + str.name + '</option>')
            })
        }).catch((err => {
            errorHandler(err, "Could not load the streets in this environment")
        }))
    })
})

// PUT the new data to the server
$(function(){
    var image1 = false;
    var image2 = false;
    var image3 = false;
    
    $('#Apart-image1').on('change', function() {
        image1 = true;
    })
    $('#Apart-image2').on('change', function() {
        image2 = true;
    })
    $('#Apart-image3').on('change', function() {
        image3 = true;
    })
    $('#submit-apart').on('click', function(){
        var payload = JSON.stringify({
            "apartment": $('#apartment :selected').val(),
            "name": $('#name').val(),
            "street_id": $('#street :selected').val(),
            "price": $('#price').val(),
            "running_water": $('#running-water :selected').val(),
            "waste-disposal": $('#Adequate-disposal :selected').val(),
            "power_supply": $('#hours').val()
        })
        var endpoint = '/houses/' + houseId;
        put(endpoint, payload)
        .then(() => {
            alert('House updated successfully')
            if (image1 === false && image2 === false && image3 === false){
                window.location.href = 'apartment-info-page2.html'
            }
        }).catch((err) => {
            errorHandler(err, "Could not update apartment, please try again later")
        })
    })
})

// update the images
$(function() {
    var image1 = false;
    var image2 = false;
    var image3 = false;
    
    $('#Apart-image1').on('change', function() {
        image1 = true;
    })
    $('#Apart-image2').on('change', function() {
        image2 = true;
    })
    $('#Apart-image3').on('change', function() {
        image3 = true;
    })
    $('#submit-apart').on('click', function(){
        $(function() {
            if (image1 === true) {
                //update the new first image
                var formData = new FormData();
                var file = $("#Apart-image1");
                formData.append("file", file[0].files[0]);
                formData.append("fileName", houseId + '.jpg');
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
                            var payload = JSON.stringify({
                                "image1": body.url,
                            })
                            var endpoint = '/houses/' + houseId;
                            put(endpoint, payload)
                            .then(() => {
                                alert("First image updated successfully");
                                if (image2 == false && image3 == false){
                                    window.location.href = 'apartment-info-page2.html';
                                }
                            })
                        }
                    })
                }).catch((err) => {
                    errorHandler(err, "Could not upload image1");
                })
            }
        })

        $(function() {
            if (image2 === true) {
                //update the new second image
                var formData = new FormData();
                var file = $("#Apart-image2");
                formData.append("file", file[0].files[0]);
                formData.append("fileName", houseId + '.jpg');
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
                            var payload = JSON.stringify({
                                "image2": body.url,
                            })
                            var endpoint = '/houses/' + houseId;
                            put(endpoint, payload)
                            .then(() => {
                                alert("Second image updated successfully");
                                if (image3 == false){
                                    window.location.href = 'apartment-info-page2.html';
                                }
                            })
                        }
                    })
                }).catch((err) => {
                    errorHandler(err, "Could not upload image2");
                })
            }
        })

        $(function() {
            if (image3 === true) {
                //update the new third image
                var formData = new FormData();
                var file = $("#Apart-image3");
                formData.append("file", file[0].files[0]);
                formData.append("fileName", houseId + '.jpg');
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
                            var payload = JSON.stringify({
                                "image3": body.url,
                            })
                            var endpoint = '/houses/' + houseId;
                            put(endpoint, payload)
                            .then(() => {
                                alert("Third image updated successfully");
                                window.location.href = 'apartment-info-page2.html';
                            })
                        }
                    })
                }).catch((err) => {
                    errorHandler(err, "Could not upload image1");
                })
            }
        })
    })
})