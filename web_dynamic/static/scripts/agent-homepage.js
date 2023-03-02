#!/usr/bin/node

const userId = window.localStorage.getItem('newId')
// Load agent info
$(function (){
	$.ajax({
		type: 'GET',
		url: 'http://localhost:8000/unikrib/users/' + userId,
		contentType: 'application/json',
		dataType: 'json',
		success: function(owner){
			$("#profile-pic-cont").html('<img src="' + owner.avatar + '">')
			$.ajax({
				type: 'GET',
				url: 'http://localhost:8000/unikrib/environments/' + owner.com_res,
				contentType: 'application/json',
				dataType: 'json',
				success: function(env){
					$('#name-cont').html(`<p class="name">` + owner.first_name + ` ` + owner.last_name + `</p>
						<p class="edit-icon"><a href="profile-edit-page.html"><icon class="fa fa-pencil"></icon></a></p>
						<p class="services" id="service-select">Agent</span></p>
						<p class="community2" id="community-select">` + env.name + `</p>
						<p class="rating">Average rating:<span id=""> ` + owner.rating.toFixed(1) + `</span><icon class="fa fa-star"></icon></span></p>
						<p class="bio">` + owner.note + `</p>`)

					$("#contact-cont").html(`<div id="uploader-phone">
						<p class="contact"><icon class="fa fa-phone"><a href="tel:+234` + owner.phone_no + `" class="contact-links"> ` + owner.phone_no + `</a></icon></p>
						</div>
						<div id="uploader-whatsapp">
				   		<p class="contact"><icon class="fa fa-whatsapp"><a href="https://api.whatsapp.com/send?phone=+234` + owner.phone_no + `"
						class="contact-links"> ` + owner.phone_no + `</a></icon></p>
						</div>`)
				},
				error: function(res) {
					alert(res.responseJSON)
				}
			})
		},
		error: function(response) {
			alert(response.responseJSON)
		}
	})
})

// Load reviews
$(function (){
	$.ajax({
		type: 'GET',
		url: 'http://localhost:8000/unikrib/users/' + userId + '/reviews',
		contentType: 'application/json',
		dataType: 'json',
		success: function (reviews){
			if (reviews.length === 0){
				$('#latest-review-cont').html('<p id="review-message"> You have no reviews yet.</p>')
				$('#other-review-cont').addClass('disappear');
			} else {
				$('#view-review').html(`<p>View all>>></p>`)
				window.localStorage.setItem('revieweeId', userId)
				$.ajax({
					type: 'GET',
					url: 'http://localhost:8000/unikrib/users/' + reviews[0].reviewer,
					contentType: 'application/json',
					dataType: 'json',
					success: function(reviewer){
						$('#latest-review-cont').html(`<div id="rev-img-cont">
							<img src="` + reviewer.avatar + `">
							</div>
							<div id="rev-name-cont">
							<p class="rev-name">` + reviewer.first_name + ` ` + reviewer.last_name + `</p>
							</div>
							<div id="rev-message-cont">
							<p id="review-message">` + reviews[0].text + `</p> 
	
							<p class="time-stamp">` + reviews[0].updated_at.slice(0, 10) + `</p>
							</div>`)
					},
					error: function(res) {
						alert(res.responseJSON)
					}
				})
				
			}
		},
		error: function(res) {
			alert(res.responseJSON)
		}
	})
})

// Load agent apartments
$(function (){
	$.ajax({
		type: 'GET',
		url: 'http://localhost:8000/unikrib/users/' + userId + '/houses',
		contentType: 'application/json',
		dataType: 'json',
		success: function (houses){
			if (houses.length === 0) {
				$('#view-more-button').addClass('disappear')
				return;
			} else if (houses.length === 1) {
				$('#view-more-button').addClass('disappear')
			}
			$.each(houses, function(index, house){
				if (index === 0){
					var cont = "first-apart";
				} else {
					var cont = "view-more-cont";
				}
				$.ajax({
					type: 'GET',
					url: 'http://localhost:8000/unikrib/streets/' + house.street_id,
					contentType: 'application/json',
					dataType: 'json',
					success: function(street){
						$.ajax({
							type: 'GET',
							url: 'http://localhost:8000/unikrib/environments/' + street.env_id,
							contentType: 'application/json',
							dataType: 'json',
							success: function(env){
								$('#' + cont).append(`<div id="output-cont" class="output-containers">
									<div id="info-` + house.id + `" class ="value-links">
									<div id="image-cont">
									<img src="` + house.image1 + `" id="img10" class="apartment-img">
									</div>
									<div id="text-cont">
									<p class="address-results"><span class ="type">` + house.apartment + `</span> in <span class ="hostel" id="hostel10">` + house.name + ` </span>for rent
									<span class ="street" id="street10">` + street.name + ` street</span><span class ="community"  id="community10"> ` + env.name + `</span></p>
									<p class="price-results"><span class ="price" id="price10">N` + house.price + ` </span>per year</p>
									<div class ="icons-cont">
									<i class="fa fa-tint"></i><i class="fa fa-bolt"><span id="hours">` + house.power_supply + `h</span></i><i class="fa fa-trash"></i>
									<icon class="fa fa-clock-o"><span id="time">25mins</span></icon>
									</div>
									</div>
									</div>
									</div>`)
								$(function() {
									$('#info-' + house.id).on('click', function() {
										window.localStorage.setItem('houseId', house.id);
										window.location.href = 'apartment-info-page2.html';
									})
								})
							},
							error: function(res) {
								alert(res.responseJSON)
							}
						})
					},
					error: function(res) {
						alert(res.responseJSON)
					}
				})
				
			})
		},
		error: function(res) {
			alert(res.responseJSON)
		}
	})
})