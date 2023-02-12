#!/usr/bin/node

/*const user = window.localStorage.getItem('newId')
var login = document.getElementById('login-cont')
var dropdown = document.getElementById('dropdown')
if (user === null){
	login.style.display = 'block';
	dropdown.style.display = 'none'
} else {
	login.style.display = 'none';
	dropdown.style.display = 'block'
}*/
$(function(){
	$.ajax({
		type: 'GET',
		url: 'http://localhost:8000/unikrib/houses/stats',
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
		url: 'http://localhost:8000/unikrib/stats/users',
		data: {},
		contentType: 'application/json',
		dataType: 'json',
		success: function (count) {
			$("#stat2").text(count['agent']);
			$("#stat3").text(count['vendor']);
			$('#stat4').text(count['sp']);
		},
		error: function () {
			$("#stat2").text('0');
		},
	});

});
