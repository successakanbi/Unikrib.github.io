#!/usr/bin/node

// load apartment info
$(function (){
	userId = window.localStorage.getItem('newId');

	$.ajax({
		type: 'GET',
		url: 'http://localhost:8000/unikrib/users/' + userId + '/houses',
		data: {},
		contentType: 'application/json',
		dataType: 'json',
		success: function (apartments) {
			$.each(apartments, function(index, house) {
				$.ajax({
					type: 'GET',
					url: 'http://localhost:8000/unikrib/streets/' + house.street_id,
					data: {},
					contentType: 'application/json',
					dataType: 'json',
					success: function(street) {
						$.ajax({
							type: 'GET',
							url: 'http://localhost:8000/unikrib/environments/' + street.env_id,
							data: {},
							contentType: 'application/json',
							datatype: 'json',
							success: function (env) {
								if (index < 4) {
									$("#apartments").append(`<div id="output-cont" class="output-containers">
										<a href="">
										<div id="image-cont">
										<img src="images/student-dorm.jpg" id="img1">
										</div>
										<div id="text-cont">
										<p class="address-results"><span class="type">` + house.apartment + `</span>
										in <span class="hostel" id="hostel1">`+ house.name + ` </span>for rent
										<span class ="street" id="street1">` + street.name + ` street, </span>
										<span class ="community" id="community1"> ` + env.name + `</span></p>
										<p class="price-results"><span class="price" id="price1">N` + house.price + `</span>per year</p>
										<div class ="icons-cont">
										<i class="fa fa-tint"></i><i class="fa fa-bolt"><span id="hours">6h</span></i><i class="fa fa-trash"></i>
										</div>
										</div>
										</a>
										</div>`)
								} else {
									$("#view-more-cont").append(`<div id="output-cont" class="output-containers">
                                                                                <a href="">
                                                                                <div id="image-cont">
                                                                                <img src="images/student-dorm.jpg" id="img1">
                                                                                </div>
                                                                                <div id="text-cont">
                                                                                <p class="address-results"><span class="type">` + house.apartment + `</span>
                                                                                in <span class="hostel" id="hostel1">`+ house.name + ` </span>for rent
                                                                                <span class ="street" id="street1">` + street.name + ` street, </span>
                                                                                <span class ="community" id="community1"> ` + env.name + `</span></p>
                                                                                <p class="price-results"><span class="price" id="price1">N` + house.price + `</span>per year</p>
                                                                                <div class ="icons-cont">
                                                                                <i class="fa fa-tint"></i><i class="fa fa-bolt"><span id="hours">6h</span></i><i class="fa fa-trash"></i>
                                                                                </div>
                                                                                </div>
                                                                                </a>
                                                                                </div>`)
								};
							},
							error: function (){
								alert("Could not load community name, please try again");
							},
						});
					},
					error: function (){
						alert("Could not load street name, please try again");
					},
				});
			})
		},
		error: function (){
			alert("Could not load apartment info");
		},
	});
});


// Load user reviews
$(function (){
	userId = window.localStorage.getItem('newId');
	$.ajax({
		type: 'GET',
		url: 'http://localhost:8000/unikrib/user' + userId + '/reviews',
		data: {},
		contentType: 'application/json',
		dataType: 'json'
		success: function (reviews) {
			if (reviews.length === 0) {
				$("#all-reviews").html(`<p>No review has been left for you yet, 
					please inform your customers to come leave you a review.</p>`);
			} else {
				$.each(reviews, function(index, review) {
					$.ajax({
						type: 'GET',
						url: 'http://localhost:8000/unikrib/users/' + review.reviewer,
						data: {},
						contentType: 'application/json',
						dataType: 'json',
						success: function (reviewer){
							$("#all-reviews").append(`<div id="review-1" class="reviews">
								<div class="reviewer-img-cont">
								<img src="` + review.avatar + `">
								</div>

								<div class="rewiewer-name-cont">
								<h4 class ="name">` + reviewer.first_name + ` ` + reviewer.last_name + `</h4>
								</div>
								<div class ="reviewer-message-cont">
								<p id="message"> ` + review.text + `</p>
								</div>

								</div>`);
						},
						error: function (){
							alert("Could not load reviewer details now, please try again later");
						},
					});
				});
			};
		},
		error: function (){
			alert("Could not load reviews, please try again later");
		},
	});
});
