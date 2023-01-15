#!/usr/bin/node

// Load house info
$(function (){
	houseId = window.localStorage.getItem('houseId');
	$.ajax({
		type: 'GET',
		url: 'http://54.173.52.4:8000/unikrib/houses/' + houseId,
		data: {},
		contentType: 'application/json',
		dataType: 'json',
		success: function (house) {
			$.ajax({
				type: 'GET',
				url: 'http://54.173.52.4:8000/unikrib/streets/' + house.street_id,
				data: {},
				contentType: 'application/json',
				dataType: 'json',
				success: function (street){
					$.ajax({
						type: 'GET',
						url: 'http://54.173.52.4:8000/unikrib/environments/' + street.env_id,
						data: {},
						contentType: 'application/json',
						dataType: 'json',
						success: function (env){
							$("#apartment-details").html(` <p class="address-results"><span class="type">` + house.apartment + `</span> in <span class="hostel" id="hostel1">` + house.name + ` </span>for rent
					               <span class ="street" id="street1">` + street.name + ` street,</span><span class ="community" id="community1">` + env.name + ` </span>
						            </p>
						          <p class="price-results"><span class="price" id="price1">N` + house.price + ` </span>per year</p>`)
						},
						error: function(){
							alert("Could not load Environment, please try again later");
						},
					});
				},
				error: function() {
					alert("Could not load street, please try again later");
				},
			});
		},
		error: function (){
			alert("Could not load apartment now, please try again later");
		},
	});
});

// load owner details
$(function (){
	houseId = window.localStorage.getItem('houseId');
	$.ajax({
		type: 'GET',
		url: 'http://54.173.52.4:8000/unikrib/houses/' + houseId,
		data: {},
		contentType: 'application/json',
		dataType: 'json',
		success: function (house){
			$.ajax({
				type: 'GET',
				url: 'http://54.173.52.4:8000/unikrib/users/' + house.owner_id,
				data: {},
				contentType: 'application/json',
				dataType: 'json',
				success: function(user) {
					$("#uploader-cont").html(`<p id="uploader">Uploaded by<span class ="Agent"> ` + user.first_name + ` ` + user.last_name + `</span></p>
		                    <div id="uploader-phone">
                		      <p class="contact"><icon class="fa fa-phone"><a href="tel:` + user.phone_no + `" class="contact-links"> ` + user.phone_no + `</a></icon></p>
		                    </div>
                		    <div id="uploader-whatsapp">
		                      <p class="contact"><icon class="fa fa-whatsapp"><a href="https://api.whatsapp.com/send?phone=` + user.phone_no + `" class="contact-links"> ` + user.phone_no + `</a></icon></p>
                		    </div>`);
				},
				error: function(){
					alert("Could not load owner details");
				},
			});
		},
		error: function (){
			alert("Could not load apartment details");
		},
	});
});
