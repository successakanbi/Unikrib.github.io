#!/usr/bin/node

// load the communities
$(function (){
	get('/environments')
	.then((envs) => {
		$.each(envs, function(index, env){
			$("#community-select").append('<option value="' + env.id + '">' + env.name + '</option>')
		});
	}).catch((err) => {
		errorHandler(err, "Could not load environments now, please try later");
	})
});

// upload user community
$(function (){
	userId = window.localStorage.getItem('newId');
	$("#submit").on('click', function() {
		payload = JSON.stringify({
			"com_res": $("#community-select :selected").val(),
		});
		endpoint = '/users/' + userId;
		put(endpoint, payload)
		.then(() => {
			alert("Community updated successfully");
		}).catch((err) => {
			errorHandler(err, "Community of residence was unable to update, please try again later");
		})
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

		getAuth()
		.then((body) => {
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
					payload = JSON.stringify({
						"avatar": body.url,
					})
					var endpoint = '/users/' + userId;
					put(endpoint, payload)
					.then(() => {
						alert("User image updated successfully");
						window.location.href = 'Apartment-page.html'
					})
				}
			})
		}).catch((err) => {
			errorHandler(err, "Could not upload profile image");
		})
	});
});
