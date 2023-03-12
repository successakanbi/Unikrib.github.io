#!/usr/bin/node

const serviceId = window.localStorage.getItem('serviceId')

// load the existing service images
$(function() {
    get('/services/' + serviceId)
    .then((service) => {
        $('#Image1').html('<img id="image1" src="' + service.image1 + '">')
        $('#Image2').html('<img id="image2" src="' + service.image2 + '">')
        $('#Image3').html('<img id="image3" src="' + service.image3 + '">')
        $('#Image4').html('<img id="image4" src="' + service.image4 + '">')
        $('#Image5').html('<img id="image5" src="' + service.image5 + '">')
    })
})
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
                            var endpoint = '/services/' + serviceId;
                            put(payload, endpoint)
                            .then(() => {
                                alert("First image uploaded succesfully");
                            }).catch((err) => {
                                errorHandler(err, "Error uploading the first image");
                            })
                        },
                    })
                }).catch(() => {
                    alert("Could not obtain authentication parameters");
                })
            }
        });

        // Upload second image if changed
        $(function() {
            if (image2 === true) {
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
                            var endpoint = '/services/' + serviceId;
                            put(payload, endpoint)
                            .then(() => {
                                alert("Second image uploaded succesfully");
                            }).catch((err) => {
                                errorHandler(err, "Error uploading the second image");
                            })
                        },
                    })
                }).catch(() => {
                    alert("Could not obtain authentication parameters");
                })
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
                            var endpoint = '/services/' + serviceId;
                            put(payload, endpoint)
                            .then(() => {
                                alert("Third image uploaded succesfully");
                            }).catch((err) => {
                                errorHandler(err, "Error uploading the third image");
                            })
                        },
                    })
                }).catch(() => {
                    alert("Could not obtain authentication parameters");
                })
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
                                "image4": body.url,
                            })
                            var endpoint = '/services/' + serviceId;
                            put(payload, endpoint)
                            .then(() => {
                                alert("Fourth image uploaded succesfully");
                            }).catch((err) => {
                                errorHandler(err, "Error uploading the fourth image");
                            })
                        },
                    })
                }).catch(() => {
                    alert("Could not obtain authentication parameters");
                })
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
                                "image5": body.url,
                            })
                            var endpoint = '/services/' + serviceId;
                            put(payload, endpoint)
                            .then(() => {
                                alert("Fifth image uploaded succesfully");
                            }).catch((err) => {
                                errorHandler(err, "Error uploading the fifth image");
                            })
                        },
                    })
                }).catch(() => {
                    alert("Could not obtain authentication parameters");
                })
            }
        });
    })
})
