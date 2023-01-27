#!/usr/bin/node

// load the communities
$(function (){
	$.ajax({
		type: 'GET',
		url: 'http://localhost:8000/unikrib/environments',
		data: {},
		contentType: 'application/json',
		dataType: 'json',
		success: function (envs){
			$.each(envs, function(index, env){
				$("#community-select").append('<option value="' + env.name + '">' + env.name + '</option>')
			});
		},
		error: function (){
			alert("Could not load environments now, please try later");
		},
	});
});

// upload user community
$(function (){
	userId = window.localStorage.getItem('newId');
	$("#submit").on('click', function() {
		userDict = {
			"com_res": $("#community-select :selected").val(),
		};
		$.ajax({
			type: 'PUT',
			url: 'http://localhost:8000/unikrib/users/' + userId,
			data: JSON.stringify(userDict),
			contentType: 'application/json',
			dataType: 'json',
			success: function (response) {
				alert("Community updated successfully");
			},
			error: function () {
				alert("Community of residence was unable to update, please try again later");
			},
		});
	});
});

// upload profile image
$(function (){
	$("#submit").on('click', function() {

		var formData = new FormData();
		var ins = $("#profile-photo")[0].files.length;

		if(ins == 0) {
			alert("Select an image please");
			return;
		}
		var file = $("#profile-photo")
		userId = window.localStorage.getItem('newId');

		formData.append("file", file[0].files[0]);
		formData.append("fileName", userId + '.jpeg');
		formData.append("folder", "user_avatar");
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
						console.log(body);
						window.location.href = 'Apartment-page.html';
					},
					error: function (jqxhr, text, error) {
						console.log(error);
					}
				});
			},
			error: function(response) {
				alert(response.message);
			},
		});
	});
});

