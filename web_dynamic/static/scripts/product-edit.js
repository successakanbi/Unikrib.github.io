#!/usr/bin/node
const productId = window.localStorage.getItem('productId');

// Load the product details
$(function() {
    get('/products/' + productId)
    .then((product) => {
        $('#Image1').html('<img id="image1" src="' + product.image1 + '">')
        $('#Image2').html('<img id="image2" src="' + product.image2 + '">')
        $('#Image3').html('<img id="image3" src="' + product.image3 + '">')

        get('/categories')
        .then((cats) => {
            $.each(cats, function(index, cat) {
                if (cat.id === product.category_id){
                    $('#product-category').append('<option value="' + cat.id + '" selected>' + cat.name + '</option>');
                } else {
                    $('#product-category').append('<option value="' + cat.id + '">' + cat.name + '</option>');
                }
            })
        }).catch((err) => {
            errorHandler(err, "Could not load product categories")
        })
        $('#product-name').val(product.name);
        $('#price').val(product.price);
        $('#product-features').val(product.features);
        if (product.delivery === 'yes') {
            $('#delivery-status').append('<option value="yes" selected>Available</option>')
        } else {
            $('#delivery-status').append('<option value="yes">Available</option>');
        }
        if (product.delivery === 'no') {
            $('#delivery-status').append('<option value="no" selected>Unavailable</option>')
        } else {
            $('#delivery-status').append('<option value="no">Unavailable</option>');
        }
        if (product.available === 'no'){
            $('#product-status').append('<option value="yes">In stock</option>')
            $('#product-status').append('<option value="no" selected>Out of stock</option>')
        } else {
            $('#product-status').append('<option value="yes" selected>In stock</option>')
            $('#product-status').append('<option value="no">Out of stock</option>')
        }
    })
})

// PUT the updated product to storage
$(function (){
    var image1 = false;
    var image2 = false;
    var image3 = false;
    
    $('#product-image1').on('change', function() {
        image1 = true;
    })
    $('#product-image2').on('change', function() {
        image2 = true;
    })
    $('#product-image3').on('change', function() {
        image3 = true;
    })
    $('#Submit-product').on('click', function(){
        var payload = JSON.stringify({
            "category_id": $('#product-category :selected').val(),
            "name": $('#product-name').val(),
            "price": $('#price').val(),
            "features": $('#product-features').val(),
            "delivery": $('#delivery-status :selected').val(),
            "available": $('#product-status :selected').val(),
        })
        var endpoint = '/products/' + productId;
        put(endpoint, payload)
        .then(() => {
            alert("Product updated successfully")
            if (image1 === false && image2 === false && image3 === false){
                getUserType()
            }
        })
    })
})

// update the images
$(function() {
    var image1 = false;
    var image2 = false;
    var image3 = false;
    
    $('#product-image1').on('change', function() {
        image1 = true;
    })
    $('#product-image2').on('change', function() {
        image2 = true;
    })
    $('#product-image3').on('change', function() {
        image3 = true;
    })
    $('#Submit-product').on('click', function(){
        $(function() {
            if (image1 === true) {
                //update the new first image
                var formData = new FormData();
                var file = $("#product-image1");
                formData.append("file", file[0].files[0]);
                formData.append("fileName", productId + '.jpg');
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
                            var endpoint = '/products/' + productId;
                            put(endpoint, payload)
                            .then(() => {
                                alert("First image updated successfully");
                                if (image2 == false && image3 == false){
                                    getUserType()
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
                var file = $("#product-image2");
                formData.append("file", file[0].files[0]);
                formData.append("fileName", productId + '.jpg');
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
                            var endpoint = '/products/' + productId;
                            put(endpoint, payload)
                            .then(() => {
                                alert("Second image updated successfully");
                                if (image3 == false){
                                    getUserType();
                                }
                            }).catch((err) => {
                                errorHandler(err, "Error uploading second image");
                            })
                        }
                    })
                }).catch((err) => {
                    errorHandler(err, "Could not upload image2");
                })
            }
        })

        //update the third image if changed
        $(function() {
            if (image3 === true) {
                var formData = new FormData();
                var file = $("#product-image3");
                formData.append("file", file[0].files[0]);
                formData.append("fileName", productId + '.jpg');
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
                            var endpoint = '/products/' + productId;
                            put(endpoint, payload)
                            .then(() => {
                                alert("Third image updated successfully");
                                getUserType();
                            }).catch((err) => {
                                errorHandler(err, "Error uploading third image");
                            })
                        }
                    })
                }).catch((err) => {
                    errorHandler(err, "Could not upload image3");
                })
            }
        })
    })
})