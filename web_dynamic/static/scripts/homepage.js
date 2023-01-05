#!/usr/bin/node

$(function(){
	$.ajax({
		type: 'GET',
		url: 'http://100.25.165.74:8000/unikrib/houses/stats',
		data: {},
		contentType: 'application/json',
		dataType: 'json',
		success: function (count) {
			$("#stat1").text(count);
		},
		error: function () {
			$("#stat1").text('0');
		},
	});

	$.ajax({
		type: 'GET',
		url: 'http://100.25.165.74:8000/unikrib/stats/agents',
		data: {},
		contentType: 'application/json',
		dataType: 'json',
		success: function (count) {
			$("#stat2").text(count);
		},
		error: function () {
			$("#stat2").text('0');
		},
	});

	$.ajax({
		type: 'GET',
		url: 'http://100.25.165.74:8000/unikrib/stats/vendors',
		data: {},
		contentType: 'application/json',
		dataType: 'json',
		success: function (count) {
			$("#stat3").text(count);
		},
		error: function (){
			$("#stat3").text('0');
		},
	});

	$.ajax({
		type: 'GET',
		url: 'http://100.25.165.74:8000/unikrib/stats/sp',
		data: {},
		contentType: 'application/json',
		dataType: 'json',
		success: function (count) {
			$("#stat4").text(count);
		},
		error: function () {
			$("#stat4").text('0');
		},
	});
});
