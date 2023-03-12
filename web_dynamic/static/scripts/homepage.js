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

$(function() {
	get('/houses/stats')
	.then((count) => {
		$('#stat1').text(count);
	}).catch(() => {
		$('#stat1').text('0');
	})

	get('/stats/users')
	.then((count) => {
		$("#stat2").text(count['agent']);
		$("#stat3").text(count['vendor']);
		$('#stat4').text(count['sp']);
	}).catch(() => {
		$("#stat2").text('0');
		$("#stat3").text('0');
		$('#stat4').text('0');
	})
})