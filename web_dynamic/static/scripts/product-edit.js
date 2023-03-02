#!/usr/bin/node
const productId = window.localStorage.getItem('productId');


// Load the product details
$(function() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8000/unikrib/products/' + productId,
        contentType: 'application/json',
        dataType: 'json',
        success: function(product) {
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8000/unikrib/categories',
                contentType: 'application/json',
                dataType: 'json',
                success: function(cats) {
                    $.each(cats, function(index, cat) {
                        if (cat.id === product.category_id){
                            $('#product-category').append('<option value="' + cat.id + '" selected>' + cat.name + '</option>');
                        } else {
                            $('#product-category').append('<option value="' + cat.id + '">' + cat.name + '</option>');
                        }
                    })
                }
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
        productDict = {
            "category_id": $('#product-category :selected').val(),
            "name": $('#product-name').val(),
            "price": $('#price').val(),
            "features": $('#product-features').val(),
            "delivery": $('#delivery-status :selected').val(),
            "available": $('#product-status :selected').val(),
        }

        $.ajax({
            type: 'PUT',
            url: 'http://localhost:8000/unikrib/products/' + productId,
            data: JSON.stringify(productDict),
            contentType: 'application/json',
            dataType: 'json',
            success: function(){
                alert("Product updated successfully")
                if (image1 === false && image2 === false && image3 === false){
                    getUserType()
                }
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
                                    url: 'http://localhost:8000/unikrib/products/' + product.id,
                                    data: JSON.stringify(image1),
                                    contentType: 'application/json',
                                    dataType: 'json',
                                    success: function(){
                                        alert("First image updated successfully");
                                        if (image2 == false && image3 == false){
                                            getUserType()
                                        }
                                    },
                                    error: function(){
                                        alert("Error uploading the first image");
                                    }
                                })                                    
                            },
                        });
                    },
                });
            }
        })
        // Update second image if changed
        $(function() {
            if (image2 === true) {
                var formData = new FormData();
    
                var file = $("#product-image2");
                formData.append("file", file[0].files[0]);
                formData.append("fileName", product.id + '.jpg');
                formData.append("folder", "productImages");
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
                                    url: 'http://localhost:8000/unikrib/products/' + product.id,
                                    data: JSON.stringify(image2),
                                    contentType: 'application/json',
                                    dataType: 'json',
                                    success: function(){
                                        alert("second image updated successfully");
                                        if (image3 === false) {
                                            getUserType()
                                        }
                                    },
                                    error: function(){
                                        alert("Error uploading the second image");
                                    }
                                })                                    
                            },
                        });
                    },
                });
            }
        })
        //update the third image if changed
        $(function() {
            if (image3 === true) {
                var formData = new FormData();

                var file = $("#product-image3");
                formData.append("file", file[0].files[0]);
                formData.append("fileName", product.id + '.jpg');
                formData.append("folder", "productImages");
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
                                    url: 'http://localhost:8000/unikrib/products/' + product.id,
                                    data: JSON.stringify(image3),
                                    contentType: 'application/json',
                                    dataType: 'json',
                                    success: function(){
                                        alert("Third image updated successfully");
                                        getUserType()
                                    },
                                    error: function(){
                                        alert("Error uploading the Third image");
                                    }
                                })                                    
                            },
                        });
                    },
                });
            }
        })
    })
})