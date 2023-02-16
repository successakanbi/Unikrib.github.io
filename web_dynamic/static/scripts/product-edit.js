#!/usr/bin/node
const productId = window.localStorage.getItem('productId');


// Load the product category
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
        }
    })
})

// PUT the updated product to server
$(function (){
    $('#Submit-product').on('click', function(){
        productDict = {
            "category_id": $('#product-category :selected').val(),
            "name": $('#product-name').val(),
            "price": $('#price').val(),
            "features": $('#product-features').val(),
            "delivery": $('#delivery-status :selected').val(),
        }

        $.ajax({
            type: 'PUT',
            url: 'http://localhost:8000/unikrib/products/' + productId,
            data: JSON.stringify(productDict),
            contentType: 'application/json',
            dataType: 'json',
            success: function(){
                alert("Product updated successfully")
                window.location.href = 'product-info-page2.html'
            }
        })
    })
})