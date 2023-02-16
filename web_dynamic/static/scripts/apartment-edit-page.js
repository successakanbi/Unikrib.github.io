#!/usr/bin/node
const houseId = window.localStorage.getItem('houseId')

// Load the apartment detail
$(function() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8000/unikrib/houses/' + houseId,
        contentType: 'application/json',
        dataType: 'json',
        success: function(house){
            if (house.apartment === 'Single-room') {
                $('#apartment').append('<option value="Single-Room" selected>Single Room</option>')
            } else {
                $('#apartment').append('<option value="Single-Room">Single Room</option>')
            }
            if (house.apartment === 'Self-contain') {
                $('#apartment').append('<option value="Single-contain" selected>Self-contain</option>')
            } else {
                $('#apartment').append('<option value="Single-contain">Self-contain</option>')
            }
            if (house.apartment === 'One-bedroom') {
                $('#apartment').append('<option value="One-bedroom" selected>One bedroom flat</option>')
            } else {
                $('#apartment').append('<option value="One-bedroom">One bedroom flat</option>')
            }
            if (house.apartment === 'Two-bedroom') {
                $('#apartment').append('<option value="Two-bedroom" selected>Two bedroom flat</option>')
            } else {
                $('#apartment').append('<option value="Two-bedroom">Two bedroom flat</option>')
            }
            if (house.apartment === 'Three-bedroom') {
                $('#apartment').append('<option value="Three-bedroom" selected>Three bedroom flat</option>')
            } else {
                $('#apartment').append('<option value="Three-bedroom">Three bedroom flat</option>')
            }

            $('#name').val(house.name)
            var price = parseInt(house.price)
            $('#price').val(price)
            $('#hours').val(house.power_supply)

            if (house.running_water === 'yes') {
                $('#running-water').append('<option value="yes" selected>Yes</option>')
            } else {
                $('#running-water').append('<option value="yes">Yes</option>')
            }
            if (house.running_water === 'no') {
                $('#running-water').append('<option value="no" selected>No</option>')
            } else {
                $('#running-water').append('<option value="nO">No</option>')
            }

            if (house.waste_disposal === 'yes') {
                $('#Adequate-disposal').append('<option value="yes" selected>Yes</option>')
            } else {
                $('#Adequate-disposal').append('<option value="yes">Yes</option>')
            }
            if (house.waste_disposal === 'no') {
                $('#Adequate-disposal').append('<option value="no" selected>No</option>')
            } else {
                $('#Adequate-disposal').append('<option value="nO">No</option>')
            }

            $.ajax({
                type: 'GET',
                url: 'http://localhost:8000/unikrib/streets/' + house.street_id,
                contentType: 'application/json',
                dataType: 'json',
                success: function(street) {
                    $.ajax({
                        type: 'GET',
                        url: 'http://localhost:8000/unikrib/environments/' + street.env_id,
                        contentType: 'application/json',
                        dataType: 'json',
                        success: function(env) {
                            $.ajax({
                                type: 'GET',
                                url: 'http://localhost:8000/unikrib/environments',
                                contentType: 'application/json',
                                dataType: 'json',
                                success: function(envs) {
                                    $.each(envs, function(index, item){
                                        if (item.name === env.name) {
                                            $('#community').append('<option value="' + env.id + '" selected>' + env.name + '</option>')
                                        } else {
                                            $('#community').append('<option value="' + item.id + '">' + item.name + '</option>')
                                        }
                                    })
                                    $.ajax({
                                        type: 'GET',
                                        url: 'http://localhost:8000/unikrib/environments/' + env.id + '/streets',
                                        contentType: 'application/json',
                                        dataType: 'json',
                                        success: function(strs){
                                            $.each(strs, function (index, str){
                                                if (str.name === street.name){
                                                    $('#street').append('<option value="' + street.id + '" selected>' + street.name + '</option>')
                                                } else {
                                                    $("#street").append('<option value="' + str.id + '">' + str.name + '</option>')
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
            

        }
    })
})

// Load the corresponding streets when the community is changed
$(function(){
    $('#community').on('change', function(){
        var env = $('#community :selected').val()
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8000/unikrib/environments/' + env + '/streets',
            contentType: 'application/json',
            dataType: 'json',
            success: function(strs){
                $('#street').html('')
                $.each(strs, function(index, str){
                    $('#street').append('<option value="' + str.id + '">' + str.name + '</option>')
                })
            }
        })
    })
})

// PUT the new data to the server
$(function(){
    
    $('#submit-apart').on('click', function(){
        var updateDict = {
            "apartment": $('#apartment :selected').val(),
            "name": $('#name').val(),
            "street_id": $('#street :selected').val(),
            "price": $('#price').val(),
            "running_water": $('#running-water :selected').val(),
            "waste-disposal": $('#Adequate-disposal :selected').val(),
            "power_supply": $('#hours').val()
        }
        $.ajax({
            type: 'PUT',
            url: 'http://localhost:8000/unikrib/houses/' + houseId,
            data: JSON.stringify(updateDict),
            contentType: 'application/json',
            dataType: 'json',
            success: function(){
                alert('House updated successfully')
                window.location.href = 'agent-homepage.html'
            }
        })
    })
})