#!/usr/bin/node

const productId = window.localStorage.getItem('productId');
const userId = window.localStorage.getItem('newId');

// Load product images
$(function(){
	get('/products/' + productId)
	.then((product) => {
		$("#apartment-slide-cont").html('')
		var count = 0;
		if (product.image1 != null){
			count += 1
		}
		if (product.image2 != null){
			count += 1
		}
		if (product.image3 != null){
			count += 1;
		}

		for (let i = 1; i <= count; i++){
			var image;
			if (i === 1){
				image = product.image1;
			} else if (i === 2) {
				image = product.image2;
			} else if (i === 3){
				image = product.image3;
			}
				
			$("#product-images").append(`<div class ="currentImage change">
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
	}).catch((err) => {
		errorHandler(err, "Could not load product images")
	})
})

// Load product info
$(function(){
	get('/products/' + productId)
	.then((product) => {
		if (product.delivery === 'yes'){
			var status = "Available";
		} else {
			var status = "Unavailable";
		}
		$('#product-details').html(`
			<p class="product-results"><span class="product-name">` + product.name + ` </span></p>
			<p class="price-results"><span class="product-price" id="product-price-1">N` + product.price + `</span></p>
			<p class="delivery">Delivery: <span class="Available" id="delivery">` + status + `</span></p>`)
		if (product.delivery === 'yes'){
			$('#delivery').removeClass('Unavailable')
			$('#delivery').addClass('Available')
		} else {
			$('#delivery').addClass('Unavailable')
			$('#delivery').removeClass('Available')
		}
		$('#features').text(product.features)
	})
})

// Load owner details
$(function(){
	get('/users/' + userId)
	.then((owner) => {
		get('/environments/' + owner.com_res)
		.then((env) => {
			$('#profile-cont').html(`
                <div id="profile-pic-cont">
                <img src="` + owner.avatar + `">
            </div>
            <div id="name-cont">
                <p class="name">`+ owner.first_name + ` ` + owner.last_name + `</p>
                <p class="services" id="service-select">Vendor</span></p>
                <p class="community" id="community-select">` + env.name + `</p>
                <p class="rating">Average rating: <span id="">` + owner.rating.toFixed(1) + `</span><icon class="fa fa-star"></icon></span></p>
                <p class="bio">` + owner.note + `</p>
            </div>
            <div id="contact-cont">
                <div id="uploader-phone">
                    <p class="contact"><icon class="fa fa-phone"><a href="tel:` + owner.phone_no + `" class="contact-links"> ` + owner.phone_no + `</a></icon></p>
                </div>
                <div id="uploader-whatsapp">
                <p class="contact"><icon class="fa fa-whatsapp"><a href="https://api.whatsapp.com/send?phone=+234` + owner.phone_no + `"
                    class="contact-links"> ` + owner.phone_no + `</a></icon></p>
                </div>
            </div>`)
		})
	}).catch((err) => {
		errorHandler(err, "Could not load owner details")
	})
})

// Load reviewers details
$(function (){
    window.localStorage.setItem('revieweeId', userId);
	get('/users/' + userId + '/reviews')
	.then((reviews) => {
		if (reviews.length === 0){
			$("#latest-review-cont").html('<p id="review-message"> No reviews has been left for you yet.</p>');
		} else {
			get('/users/' + reviews[0].reviewer)
			.then((reviewer) => {
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
			})
		}
	}).catch((err) => {
		errorHandler(err, "Could not load reviewer details");
	})
})

//Deletes the product when the delete buttonis clicked
/*$(function() {
	$('#delete-product').on('click', function(){
		$.ajax({
			type: 'GET',
			url: '/products/' + productId,
			contentType: 'application/json',
			dataType: 'json',
			success: function(product){
				var imgList = [product.image1, product.image2, product.image3]
				$.ajax({
					type: 'POST',
					url: 'http://localhost:8003/unikrib/delete-file',
					data: JSON.stringify(imgList),
					contentType: 'application/json',
					dataType: 'json',
					success: function() {
						alert("images deleted successfully")
						window.location.href = 'agent-homepage.html'
					},
					error: function(){
						alert("An error occurred and images could not be deleted")
					}
				})
				$.ajax({
					type: 'DELETE',
					url: '/products/' + productId,
					contentType: 'application/json',
					dataType: 'json',
					success: function(){
						alert("Product deleted successfully")
					},
					error: function(){
						alert("An error occured and product could not be deleted")
					}
				})
			}
		})
		
	})
})*/