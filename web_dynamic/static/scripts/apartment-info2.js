#!/usr/bin/node

const houseId = window.localStorage.getItem('houseId');
const userId = window.localStorage,getItem('newId');

//Load apartment images
$(function (){
	$.ajax({
		type: 'GET',
		url: 'http://localhost:8000/unikrib/houses/' + houseId,
		contentType: 'application/json',
		dataType: 'json',
		success: function(house){
			$("#apartment-slide-cont").html('')
			var count = 0;
			if (house.image1 != null){
				count += 1
			}
			if (house.image2 != null){
				count += 1
			}
			if (house.image3 != null){
				count += 1;
			}
			
			for (let i = 1; i <= count; i++){
				var image;
				if (i === 1){
					image = house.image1;
				} else if (i === 2) {
					image = house.image2;
				} else if (i === 3){
					image = house.image3;
				}
				
				$("#apart-images").append(`<div class ="currentImage change">
					<div class="numb-text">` + i + ` / ` + count + `</div>
					<img src=` + image + ` style="width:100%;" id="Apart-image1">
				 </div>`)
				 
				 $("#dot-container").append(`<span class="dot" id="current` + i + `"></span>`)
				 $("#current" + i).on('click', function(){
					showSlides(slideIndex=i)
				 })
			}
			
			let slideIndex = 1;
    		showSlides(slideIndex);

			$("#minus").on('click', function(){
				showSlides(slideIndex += -1)
			})
			$("#plus").on('click', function(){
				showSlides(slideIndex += 1);
			})
			

			function showSlides(n) {
				const slides = document.getElementsByClassName("currentImage");
				let dots = document.getElementsByClassName("dot");

				if (n > slides.length) {slideIndex = 1}
				else if(n < 1) {slideIndex = slides.length}
				else {slideIndex = n}
				for(let i = 0; i < slides.length; i++){
					slides[i].style.display = "none"
				}
				for(let i = 0; i < dots.length; i++) {
					dots[i].className = dots[i].className.replace(" active", "");
				}
				
				if (slideIndex-1 >= count){slideIndex=1}
				slides[slideIndex-1].style.display = "block";				
				dots[slideIndex-1].className += " active";
			}
		},
	})
})

	
// Load house info
$(function (){
	
	$.ajax({
		type: 'GET',
		url: 'http://localhost:8000/unikrib/houses/' + houseId,
		data: {},
		contentType: 'application/json',
		dataType: 'json',
		success: function (house) {
			$.ajax({
				type: 'GET',
				url: 'http://localhost:8000/unikrib/streets/' + house.street_id,
				data: {},
				contentType: 'application/json',
				dataType: 'json',
				success: function (street){
					$.ajax({
						type: 'GET',
						url: 'http://localhost:8000/unikrib/environments/' + street.env_id,
						data: {},
						contentType: 'application/json',
						dataType: 'json',
						success: function (env){							
							$("#apartment-details").html(` <p class="address-results"><span class="type">` + house.apartment + `</span> in <span class="hostel" id="hostel1">` + house.name + ` </span>for rent
					               <span class ="street" id="street1">` + street.name + ` street,</span><span class ="community" id="community1"> ` + env.name + ` </span>
						            </p>
						          <p class="price-results"><span class="price" id="price1">N` + house.price + ` </span>per year</p>`)
							if (house.running_water === 'yes'){
								$('#feature-cont').append('<p class="feature"><icon class="fa fa-tint"></icon> Running water available</p>');
							}
							if (house.power_supply != null){
								$('#feature-cont').append('<p class="feature"><icon class="fa fa-bolt"></icon> ' + house.power_supply + 'h of power daily</p>')
							}
							if (house.waste_disposal === 'yes'){
								$('#feature-cont').append('<p class="feature"><icon class="fa fa-trash"></icon> waste disposal available</p>');
							}							
						
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
	$.ajax({
		type: 'GET',
		url: 'http://localhost:8000/unikrib/users/' + house.owner_id,
		data: {},
		contentType: 'application/json',
		dataType: 'json',
		success: function(user) {
			if (user.avatar === null){
				var src1 = "images/photo5.png"
			} else {
				var src1 = user.avatar
			}
			$("#profile-cont").html(`<div id="profile-pic-cont">
				<img src="` + src1 + `">
			  </div>
				<div id="name-cont">
				<p class="name"><span id="fname">` + user.first_name + ` </span><span id="lname"> ` + user.last_name + `</span></p>
				<p class="services" id="service-select">Agent</span></p>
				<p class="community2" id="community-select">Ekosodin</p>
        		<p class="rating">Average rating:<span id="">4</span><icon class="fa fa-star"></icon></span></p>
        		<p class="bio">I help students find affordable and suitable apartments of all types</p>
			  </div>
			  <div id="contact-cont">
				<div id="uploader-phone">
				<p class="contact"><icon class="fa fa-phone"><a href="tel:+234` + user.phone_no + `" class="contact-links"> ` + user.phone_no + `</a></icon></p>
				</div>
				<div id="uploader-whatsapp">
				   <p class="contact"><icon class="fa fa-whatsapp"><a href="https://api.whatsapp.com/send?phone=+234` + user.phone_no + `"
					class="contact-links"> ` + user.phone_no + `</a></icon></p>
				</div>
			</div>`);
		},
		error: function(){
			alert("Could not load owner details");
		},
	})
});


// Load reviewers details
$(function (){
	$.ajax({
		type: 'GET',
		url: 'http://localhost:8000/unikrib/houses/' + houseId,
		contentType: 'application/json',
		dataType: 'json',
		success: function (house){
			window.localStorage.setItem('revieweeId', house.owner_id);
			$.ajax({
				type: 'GET',
				url: 'http://localhost:8000/unikrib/users/' + house.owner_id + '/reviews',
				contentType: 'application/json',
				dataType: 'json',
				success: function (reviews){
					if (reviews.length === 0){
						$("#latest-review-cont").html('<p id="review-message"> No reviews has been left for you yet.</p>');
                    } else {
						$.ajax({
							type: 'GET',
							url: 'http://localhost:8000/unikrib/users/' + reviews[0].reviewer,
							data: {},
							contentType: 'application/json',
							dataType: 'json',
							success: function (reviewer){
								$("#latest-review-cont").html(`<div id="rev-img-cont">
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
							error: function (){
								alert("Could not load reviewer details, please try again later");
							}
						})
					}
				},
			});
		},
		error: function (){
			alert("Could not load reviews now. please try again later");
		}
	})
})
