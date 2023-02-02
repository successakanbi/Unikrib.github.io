#!/usr/bin/node

// Load all environments
$(function (){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8000/unikrib/environments',
        data: {},
        ContentType: 'application/json',
        dataType: 'json',
        success: function (items){
            $.each(items, function (index, environment){
                $("#community").append('<option value="' + environment.id + '">' + environment.name + '</option>');
            })
        },
        error: function(){
            alert('Could not load available environments now, please try later');
        }
    })
});

// Load the streets in the selected environment
$(function (){
    $("#community").on('change', function(){
        const env_id = $("#community :selected").val();
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8000/unikrib/environments/' + env_id + '/streets',
            data: {},
            contentType: 'application/json',
            dataType: 'json',
            success: function (streets){
                $('#street').html('');
                $.each(streets, function(index, street) {
                    $("#street").append('<option value="' + street.id + '">' + street.name + '</option>');
                })
            }
        })
    })
});

//Post the inputted apartment details
$(function (){
    const userId = window.localStorage.getItem('newId')
    $("#Submit-apart").on('click', function(){
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
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8000/unikrib/houses',
            data: JSON.stringify(houseDict),
            contentType: 'application/json',
            dataType: 'json',
            success: function(house){
                alert('Apartment uploaded successfully');

                $(function (){
                    //upload first image
                    var formData = new FormData();
                    
                    var file = $("#Apart-image1")

                    formData.append("file", file[0].files[0]);
                    formData.append("fileName", house.id + '.jpg');
                    formData.append("folder", "apartment-images");
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
                                        "image1": body.url
                                    }
                                    $.ajax({
                                        type: 'PUT',
                                        url: 'http://localhost:8000/unikrib/houses/' + house.id,
                                        data: JSON.stringify(image1),
                                        contentType: 'application/json',
                                        dataType: 'json',
                                        success: function(){
                                            alert("First image uploaded successfully");
                                        },
                                        error: function(){
                                            alert("Error uploading the first image");
                                        }
                                    })                                    
                                },
                            });
                        },
                    });
                });

                $(function (){
                    //upload second image
                    var formData = new FormData();
    
                    var file = $("#Apart-image2")
                    if (file.length === 0) {
                        return;
                    }

                    formData.append("file", file[0].files[0]);
                    formData.append("fileName", house.id + '.jpg');
                    formData.append("folder", "apartment-images");
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
                                    image2 = {
                                        "image2": body.url
                                    }
                                    $.ajax({
                                        type: 'PUT',
                                        url: 'http://localhost:8000/unikrib/houses/' + house.id,
                                        data: JSON.stringify(image2),
                                        contentType: 'application/json',
                                        dataType: 'json',
                                        success: function(){
                                            alert("Second image uploaded successfully");
                                        },
                                        error: function(){
                                            alert("Error uploading the second image");
                                        }
                                    })                                    
                                },
                            });
                        },
                    });
                });
                $(function (){
                    //upload third image
                    var formData = new FormData();
    
                    var file = $("#Apart-image3")
                    if (file === 0) {
                        return;
                    }

                    formData.append("file", file[0].files[0]);
                    formData.append("fileName", house.id + '.jpg');
                    formData.append("folder", "apartment-images");
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
                                    image3 = {
                                        "image3": body.url
                                    }
                                    $.ajax({
                                        type: 'PUT',
                                        url: 'http://localhost:8000/unikrib/houses/' + house.id,
                                        data: JSON.stringify(image3),
                                        contentType: 'application/json',
                                        dataType: 'json',
                                        success: function(){
                                            alert("Third image uploaded successfully");
                                        },
                                        error: function(){
                                            alert("Error uploading the third image");
                                        }
                                    })                                    
                                },
                            });
                        },
                    });
                });
            },
            error: function(){
                alert("Error uploading apartment");
            }
        })
    })
});