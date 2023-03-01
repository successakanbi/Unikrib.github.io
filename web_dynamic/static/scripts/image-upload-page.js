#!/usr/bin/node

const userId = window.localStorage.getItem('newId');
const serviceId = window.localStorage.getItem('serviceId')

$(function (){
    $('#imgs-submit').on('click', function (){
        var ins = $("#service-image1")[0].files.length;
        if(ins == 0) {
            alert("First image cannot be empty");
            return;
        }

        // Upload first image
        $(function (){
            var formData = new FormData();
                    
            var file = $("#service-image1");
    
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
                                    alert("First image uploaded successfully");
                                    window.location.href = 'service-page.html'
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

        // Upload second image
        $(function (){
            var formData = new FormData();
                    
            var file = $("#service-image2");
            var ins = $("#service-image2")[0].files.length;
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

        // Upload third image
        $(function (){
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

        // Upload fourth image
        $(function (){
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
                                    alert("Fourth image uploaded successfully");
                                },
                                error: function(){
                                    alert("Error uploading the fourth image");
                                }
                            })                                    
                        },
                    });
                },
            });
        });

        // Upload fifth image
        $(function (){
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
                                    alert("Fifth image uploaded successfully");
                                },
                                error: function(){
                                    alert("Error uploading the fifth image");
                                }
                            })                                    
                        },
                    });
                },
            });
        });
    })
})