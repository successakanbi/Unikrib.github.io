#!/usr/bin/node

const serviceId = window.localStorage.getItem('serviceId')
var image1 = false
var image2 = false
var image3 = false
var image4 = false
var image5 = false

$("#service-image1").on('change', function(){
    image1 = true
})
$('#service-image2').on('change', function() {
    image2 = true
})
$('#service-image3').on('change', function() {
    image3 = true
})
$('#service-image4').on('change', function() {
    image4 = true
})
$('#service-image5').on('change', function() {
    image5 = true
})
$(function() {
    $('#imgs-submit').on('click', function() {
        // Upload first image if changed
        $(function() {
            if (image1 === true) {
                var formData = new FormData();
                        
                var file = $("#service-image1");
                var ins = $("#service-image1")[0].files.length;
                if(ins == 0) {
                    alert("First image cannot be empty")
                    return;
                }

                formData.append("file", file[0].files[0]);
                formData.append("fileName", serviceId + '.jpg');
                formData.append("folder", "serviceImages");
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
                                    "image1": body.url,
                                }
                                $.ajax({
                                    type: 'PUT',
                                    url: 'http://localhost:8000/unikrib/services/' + serviceId,
                                    data: JSON.stringify(image1),
                                    contentType: 'application/json',
                                    dataType: 'json',
                                    success: function(){
                                        alert("First image updated successfully");
                                    },
                                    error: function(){
                                        alert("Error updating the first image");
                                    }
                                })                                    
                            },
                        });
                    },
                });
            }
        });
        
        // Upload second image if changed
        $(function() {
            if (image2 === true) {
                var formData = new FormData();
                        
                var file = $("#service-image2");

                formData.append("file", file[0].files[0]);
                formData.append("fileName", serviceId + '.jpg');
                formData.append("folder", "serviceImages");
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
                                    "image2": body.url,
                                }
                                $.ajax({
                                    type: 'PUT',
                                    url: 'http://localhost:8000/unikrib/services/' + serviceId,
                                    data: JSON.stringify(image2),
                                    contentType: 'application/json',
                                    dataType: 'json',
                                    success: function(){
                                        alert("Second image updated successfully");
                                    },
                                    error: function(){
                                        alert("Error updating second image");
                                    }
                                })                                    
                            },
                        });
                    },
                });
            }
        });

        // Upload third image if changed
        $(function() {
            if (image3 === true) {
                var formData = new FormData();
                        
                var file = $("#service-image3");
                var ins = $("#service-image3")[0].files.length;
                if(ins == 0) {
                    return;
                }

                formData.append("file", file[0].files[0]);
                formData.append("fileName", serviceId + '.jpg');
                formData.append("folder", "serviceImages");
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
                                    "image3": body.url,
                                }
                                $.ajax({
                                    type: 'PUT',
                                    url: 'http://localhost:8000/unikrib/services/' + serviceId,
                                    data: JSON.stringify(image3),
                                    contentType: 'application/json',
                                    dataType: 'json',
                                    success: function(){
                                        alert("Third image updated successfully");
                                    },
                                    error: function(){
                                        alert("Error updating third image");
                                    }
                                })                                    
                            },
                        });
                    },
                });
            }
        });

        // Upload fourth image if changed
        $(function() {
            if (image4 === true) {
                var formData = new FormData();
                        
                var file = $("#service-image4");
                var ins = $("#service-image4")[0].files.length;
                if(ins == 0) {
                    return;
                }

                formData.append("file", file[0].files[0]);
                formData.append("fileName", serviceId + '.jpg');
                formData.append("folder", "serviceImages");
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
                                image4 = {
                                    "image4": body.url,
                                }
                                $.ajax({
                                    type: 'PUT',
                                    url: 'http://localhost:8000/unikrib/services/' + serviceId,
                                    data: JSON.stringify(image4),
                                    contentType: 'application/json',
                                    dataType: 'json',
                                    success: function(){
                                        alert("Fourth image updated successfully");
                                    },
                                    error: function(){
                                        alert("Error updating fourth image");
                                    }
                                })                                    
                            },
                        });
                    },
                });
            }
        });

        // Upload fifth image if changed
        $(function() {
            if (image5 === true) {
                var formData = new FormData();
                        
                var file = $("#service-image5");
                var ins = $("#service-image5")[0].files.length;
                if(ins == 0) {
                    return;
                }

                formData.append("file", file[0].files[0]);
                formData.append("fileName", serviceId + '.jpg');
                formData.append("folder", "serviceImages");
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
                                image5 = {
                                    "image5": body.url,
                                }
                                $.ajax({
                                    type: 'PUT',
                                    url: 'http://localhost:8000/unikrib/services/' + serviceId,
                                    data: JSON.stringify(image5),
                                    contentType: 'application/json',
                                    dataType: 'json',
                                    success: function(){
                                        alert("Fifth image updated successfully");
                                    },
                                    error: function(){
                                        alert("Error updating the fifth image");
                                    }
                                })                                    
                            },
                        });
                    },
                });
            }
        });
    })
})
