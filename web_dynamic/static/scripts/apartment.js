#!/usr/bin/node

//load environments
$(function() {
	$.ajax({
		type: 'GET',
		url: 'http://54.173.52.4:8000/unikrib/environments',
		data: {},
		contentType: 'application/json',
		dataType: 'json',
		success: function(items) {
			$.each(items, function(index, item) {
				$("#location-search").append("<option value='" + item.id + "'>" + item.name + "</option>");
			});
		},
		error: function() {
			alert("Could not load available environments")
		},
	});
});

//Get House stats
$(function (){
	$.ajax({
		type: 'GET',
		url: 'http://54.173.52.4:8000/unikrib/houses/stats',
		data: {},
		contentType: 'application/json',
		dataType: 'json',
		success: function(count) {
			$("#stats").text(count)
		},
		error: function(){
			alert("Could not load house stats");
		},
	});
});
