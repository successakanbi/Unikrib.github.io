#!/usr/bin/node

const userId = window.localStorage.getItem('newId')
// Load the available categories
$(function(){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8000/unikrib/categories',
        contentType: 'application/json',
        dataType: 'json',
        success: function (cats){
            $.each(cats, function (index, cat) {
                $('#product-category').append('<option value="' + cat.id + '">' + cat.name + '</option>')
            })
        }
    })
})

// Post new product
$(function (){
    $('#submit-btn').on('click', function(){
        productDict = {
            "name": $('#product-name').val(),
            "price": $('#price').val(),
            "features": $("#product-features").val(),
            "delivery": $('#delivery-status :selected').val(),
            "category_id": $('#product-category :selected').val(),
            "owner_id": userId,
        }

        var ins = $("#product-image1")[0].files.length;
        if(ins == 0) {
            alert("First image cannot be empty");
            return;
        }
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8000/unikrib/products',
            data: JSON.stringify(productDict),
            contentType: 'application/json',
            dataType: 'json',
            success: function(product){
                alert('Please wait while we upload the images...');
    
                $(function (){
                    //upload first image
                    var formData = new FormData();
                    
                    var file = $("#product-image1");
    
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
                                    image1 = {
                                        "image1": body.url
                                    }
                                    $.ajax({
                                        type: 'PUT',
                                        url: 'http://localhost:8000/unikrib/products/' + product.id,
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
    
                    var file = $("#product-image2")
                    if (file.length === 0) {
                        return;
                    }
    
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
                                        "image2": body.url
                                    }
                                    $.ajax({
                                        type: 'PUT',
                                        url: 'http://localhost:8000/unikrib/products/' + product.id,
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
    
                    var file = $("#product-image3")
                    if (file === 0) {
                        return;
                    }
    
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
                                        "image3": body.url
                                    }
                                    $.ajax({
                                        type: 'PUT',
                                        url: 'http://localhost:8000/unikrib/products/' + product.id,
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
                        }
                    })
                })
            },
            error: function (){
                alert('There was an error uploading the images');
            }
        })
    })    
})