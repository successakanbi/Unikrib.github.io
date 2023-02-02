#!/usr/bin/node

// Load all the available environments
$(function (){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8000/unikrib/environments',
        data: {},
        contentType: 'application/json',
        dataType: 'json',
        success: function (envs){
            $('#community').html('')
            $('#community').append('<option value="all">All communities</option>')
            $.each(envs, function(index, env){
                $("#community").append('<option value="' + env.id + '">' + env.name + '</option>')
            })
        },
        error: function (){
            alert("Error, could not load environments");
        }
    })
})

// Load all the available categories
$(function (){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8000/unikrib/categories',
        data: {},
        contentType: 'application/json',
        dataType: 'json',
        success: function (categories){
            $.each(categories, function(index, category){
                $("#seller").append('<option value="' + category.id + '">' + category.name + '</option>')
            })
        }
    })
})

// Load all the products in the selected category
$(function (){
    $("#seller").on('change', function (){
        var cat = $("#seller").val()
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8000/unikrib/categories/' + cat + '/products',
            data: {},
            contentType: 'appliaction/json',
            dataType: 'json',
            success: function (products){
                $("#value-provider").html('')
                $.each(products, function(index, product){
                    $("#value-provider").append('<option value="' + product.id + '">' + product.name + '</option>')
                })
            },
            error: function (){
                alert("Could not load the products in this category")
            }
        })
    })
})

// Load all Products
$(function (){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8000/unikrib/products',
        data: {},
        contentType: 'application/json',
        dataType: 'json',
        success: function (products){
            $("#all-products").html('')
            $.each(products, function(index, product){
                $('#all-products').append(`<div id="" class="output-containers">
                <a href="product-service-info-page.html">
                    <div id="img-container">
                    <img src="images/photo5.png">
                </div>
                <div id="text-container">
                    <p class ="name"><span id="fname">Osagede</span><span id="lname"> idehen</span></p>
                    <p class="services" id="service-select"> Painter</p>
                    <p class="community" id ="community-select">Osasoghie</p>
                </div>   
                </a>
                </div>`)
            })
        },
        error: function (){
            alert("Could ot load the available products.")
        }
    })
})
// Load searched products
$(function (){
    $("#value-provider-search").on('click', function (){
        var searchDict = {
            "location": $("#community :selected").val(),
            "category": $("#seller :selected").val(),
            "product": $("#value-provider :selected").val(),
        }
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8000/unikrib/search_product',
            data: JSON.stringify(searchDict),
            contentType: 'application/json',
            dataType: 'json',
            success: function (products) {
                $("#all-products").append(`<div id="" class="output-containers">
                    <a href="product-service-info-page.html">
                        <div id="img-container">
                        <img src="images/photo5.png">
                    </div>
                    <div id="text-container">
                        <p class ="name"><span id="fname">Osagede</span><span id="lname"> idehen</span></p>
                        <p class="services" id="service-select"> Painter</p>
                        <p class="community" id ="community-select">Osasoghie</p>
                    </div>   
                    </a>
                    </div>`)
            },
            error: function (){
                alert("Could not load search results.")
            }
        })
    })
})