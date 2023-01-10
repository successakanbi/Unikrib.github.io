#!/usr/bin/node

$(function (){
	userId = window.localStorage.getItem('newId');
	$("#submit").on('click', function() {
		userDict = {
			"com_res": $("#community-select :selected").val(),
		};
		$.ajax({
			type: 'PUT',
			url: 'http://100.25.165.74:8000/users/' + userId,
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

		var form_data = new FormData();
		var ins = $("#profile-photo")[0].files.length;

		if(ins == 0) {
			alert("Select an image please");
			return;
		}
		form_data.append("file", $("#profile-photo")[0].files);

		$.ajax({
			type: 'POST',
			url: 'http://100.25.165.74:8000/upload-profile-img',
			cache: false,
			contentType: false,
			data: form_data,
			success: function(response) {
				alert(response.message);
			},
			error: function(response) {
				alert(response.message);
			},
		});
	});
});


