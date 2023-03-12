#!/usr/bin/node

const userId = window.localStorage.getItem('newId')
// Load the available categories
$(function(){
    get('/categories')
    .then((cats) => {
        $.each(cats, function (index, cat) {
            $('#product-category').append('<option value="' + cat.id + '">' + cat.name + '</option>')
        })
    }).catch((err) => {
        errorHandler(err, "Could not load available categories");
    })
})

// Post new product
$(function (){
    $('#submit-product').on('click', function(){
        var payload = JSON.stringify({
            "name": $('#product-name').val(),
            "price": $('#price').val(),
            "features": $("#product-features").val(),
            "delivery": $('#delivery-status :selected').val(),
            "category_id": $('#product-category :selected').val(),
            "owner_id": userId,
            "available": $('#product-status :selected').val(),
        });

        var ins = $("#product-image1")[0].files.length;
        if(ins == 0) {
            alert("First image cannot be empty");
            return;
        }
        post('/products', payload)
        .then((product) => {
            alert("Please wait while we upload the images...");
            $(function() {
                // upload first image
                var formData = new FormData();
                var file = $("#product-image1");
                var ins = $("#product-image1")[0].files.length;
                if(ins == 0) {
                    return;
                }
    
                formData.append("file", file[0].files[0]);
                formData.append("fileName", product.id + '.jpg');
                formData.append("folder", "productImages");
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
                            var endpoint = '/products/' + product.id;
                            put(endpoint, payload)
                            .then(() => {
                                alert("First image uploaded successfully");
                                var ins2 = $("#product-image2")[0].files.length;
                                var ins3 = $("#product-image3")[0].files.length;
                                if(ins2 == 0 && ins3 == 0) {
                                    getUserType();
                                }
                            })
                        }
                    })
                })
            })
            $(function() {
                // upload second image
                var formData = new FormData();
                var file = $("#product-image2");
                var ins = $("#product-image2")[0].files.length;
                var ins3 = $("#product-image3")[0].files.length;
                if(ins == 0 && ins3 != 0) { // if image2 is empty and image3 is not, then put image3 for image2
                    var file = $("#product-image3")
                } else if (ins == 0 && ins3 == 0) {
                    getUserType();
                } else if (ins == 0) {
                    return;
                }
    
                formData.append("file", file[0].files[0]);
                formData.append("fileName", product.id + '.jpg');
                formData.append("folder", "productImages");
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
                            var endpoint = '/products/' + product.id;
                            put(endpoint, payload)
                            .then(() => {
                                alert("Second image uploaded successfully");
                                var ins3 = $("#product-image3")[0].files.length;
                                if (ins3 == 0) {
                                    getUserType()
                                }
                            })
                        }
                    })
                })
            })
            $(function() {
                // upload third image
                var formData = new FormData();
                var file = $("#product-image3");
                var ins = $("#product-image3")[0].files.length;
                if(ins == 0) {
                    return;
                }
    
                formData.append("file", file[0].files[0]);
                formData.append("fileName", product.id + '.jpg');
                formData.append("folder", "productImages");
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
                            var endpoint = '/products/' + product.id;
                            put(endpoint, payload)
                            .then(() => {
                                alert("Third image uploaded successfully");
                                getUserType();
                            })
                        }
                    })
                })
            })
        }).catch((err) => {
            errorHandler(err, "Error encountered while uploading product. Please try again")
        })
    })    
})