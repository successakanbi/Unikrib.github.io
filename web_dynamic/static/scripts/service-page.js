#!/usr/bin/node

const userId = window.localStorage.getItem('newId')

// Load all the available environments
$(function (){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8000/unikrib/environments',
        contentType: 'application/json',
        dataType: 'json',
        success: function (envs){
            $.each(envs, function (index, env){
                $('#community').append('<option value="' + env.id + '">' + env.name + '</option>')
            })            
        }
    })
})

// Load all the available categories
$(function (){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8000/unikrib/service-categories',
        contentType: 'application/json',
        dataType: 'json',
        success: function(cats){
            $.each(cats, function(index, cat){
                $('#service-provider').append('<option value="' + cat.id + '">' + cat.name + '</option>')
            })
        },
        error: function(){
            alert("Error loading service categories");
        }
    })
})

//Load all the available services
$(function (){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8000/unikrib/services',
        contentType: 'application/json',
        dataType: 'json',
        success: function (services){
            if (services.length === 0){
                $('#number-results').text('0 - 0');
                $('#view-more-button').addClass('disappear');
            } else if (services.length < 10){
                $('#number-results').text('1 - ' + services.length);
                $('#view-more-button').addClass('disappear')
            } else {
                $('#number-results').text('1 - 9');
            }
            $('#total-length').text(services.length);
            $('#view-more-cont').html('')

            $('#all-services').html('')
            $.each(services, function (index, service){
                $.ajax({
                    type: 'GET',
                    url: 'http://localhost:8000/unikrib/users/' + service.owner_id,
                    contentType: 'application/json',
                    dataType: 'json',
                    success: function (owner){
                        $.ajax({
                            type: 'GET',
                            url: 'http://localhost:8000/unikrib/environments/' + owner.com_res,
                            contentType: 'application/json',
                            dataType: 'json',
                            success: function (env){
                                $.ajax({
                                    type: 'GET',
                                    url: 'http://localhost:8000/unikrib/service-categories/' + service.category_id,
                                    contentType: 'application/json',
                                    dataType: 'json',
                                    success: function (cat){
                                        $("#all-services").append(`<div id="" class="output-containers">        
                                        <div id="` + service.id + `">          
                                         <div id="img-container">
                                       <img src="` + service.image1 + `">
                                         </div>
                                         <div id="text-container">
                                           <p class ="name">` + owner.first_name + ` ` + owner.last_name + `</p>
                                           <p class="services" id="service-select"> ` + cat.name + `</p>
                                          <p class="community" id ="community-select">` + env.name + `</p>
                                          <p class="rating">Average star rating: <span class="ratings" id="rating-val-1">` + owner.rating.toFixed(1) + ` <icon class="fa fa-star"></icon></span></p>
                                         </div>   
                                         </div>
                                        </div>`)

                                        $(function (){
                                            $("#" + service.id).on('click', function(){										                                        
                                                var user = window.localStorage.getItem('newId');
                                                if (user === null) {
                                                    alert("Please log in or create an account first")
                                                    window.location.href = 'login.html';
                                                } else {
                                                    window.localStorage.setItem('serviceId', service.id);											
                                                    window.location.href = 'service-info-page.html';
                                                }
                                            });
                                        });
                                    }
                                })
                                
                            }
                        })
                    }
                })
            })
            
        }
    })
})

// Load search results
$(function (){
    $("#service-search").on('click', function(){
        var searchDict = {
            "location": $('#community :selected').val(),
            "category_id": $('#service-provider :selected').val(),
        }
        catName = $('#service-provider :selected').text()
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8000/unikrib/service-search',
            data: JSON.stringify(searchDict),
            contentType: 'application/json',
            dataType: 'json',
            success: function (services){
                alert("Search returned " + services.length + " results")
                $('#all-services').html('')
                if (services.length === 0){
                    $('#number-results').text('0 - 0');
                    $('#view-more-button').addClass('disappear');
                } else if (services.length < 10){
                    $('#number-results').text('1 - ' + services.length);
                    $('#view-more-button').addClass('disappear')
                } else {
                    $('#number-results').text('1 - 9');
                }
                $('#total-length').text(services.length);
                $.each(services, function(index, service){
                    $.ajax({
                        type: 'GET',
                        url: 'http://localhost:8000/unikrib/users/' + service.owner_id,
                        contentType: 'application/json',
                        dataType: 'json',
                        success: function (owner){
                            $.ajax({
                                type: 'GET',
                                url: 'http://localhost:8000/unikrib/environments/' + owner.com_res,
                                contentType: 'application/json',
                                dataType: 'json',
                                success: function (env){
                                    $("#all-services").append(`<div id="" class="output-containers">        
                                                        <div id="` + service.id + `">          
                                                        <div id="img-container">
                                                    <img src="` + service.image1 + `">
                                                        </div>
                                                        <div id="text-container">
                                                        <p class ="name">` + owner.first_name + ` ` + owner.last_name + `</p>
                                                        <p class="services" id="service-select"> ` + catName + `</p>
                                                        <p class="community" id ="community-select">` + env.name + `</p>
                                                        <p class="rating">Average star rating: <span class="ratings" id="rating-val-1">` + owner.rating + ` <icon class="fa fa-star"></icon></span></p>
                                                        </div>   
                                                        </div>
                                                </div>`)

                                                $(function (){
                                                    $("#" + service.id).on('click', function(){										                                        
                                                        var user = window.localStorage.getItem('newId');
                                                        if (user === null) {
                                                            alert("Please log in or create an account first")
                                                            window.location.href = 'login.html';
                                                        } else {
                                                            window.localStorage.setItem('serviceId', service.id);											
                                                            window.location.href = 'service-info-page.html';
                                                        }
                                                    });
                                                });
                                },
                            })
                        }
                    })
                })
            }
        })
    })
})