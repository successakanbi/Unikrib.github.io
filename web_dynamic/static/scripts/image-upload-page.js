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
                        put(endpoint, payload)
                        .then(() => {
                            alert("First image uploaded successfully");
                            getUserType();
                        }).catch((err) => {
                            errorHandler(err, "Error uploading first image");
                        })
                    }
                })
            })
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
                        put(endpoint, payload)
                        .then(() => {
                            alert("Second image uploaded successfully");
                        }).catch((err) => {
                            errorHandler(err, "Error uploading second image");;
                        })
                    }
                })
            })
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
                        put(endpoint, payload)
                        .then(() => {
                            alert("Third image uploaded successfully");
                        }).catch((err) => {
                            errorHandler(err, "Error uploading third image");;
                        })
                    }
                })
            })
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
                        put(endpoint, payload)
                        .then(() => {
                            alert("Fourth image uploaded successfully");
                        }).catch((err) => {
                            errorHandler(err, "Error uploading fourth image");
                        })
                    }
                })
            })
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
                        put(endpoint, payload)
                        .then(() => {
                            alert("Fifth image uploaded successfully");
                        }).catch((err) => {
                            errorHandler(err, "Error uploading fifth image");;
                        })
                    }
                })
            })
        });
    })
})