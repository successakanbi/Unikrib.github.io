#!/usr/bin/node

const userId = window.localStorage.getItem('newId');

// Load owner details
$(function(){
    get('/users/' + userId)
    .then((owner) => {
        get('/environments/' + owner.com_res)
        .then((env) => {
            $('#profile-cont').html(`<div id="profile-pic-cont">
                    <img src="` + owner.avatar + `">
                </div>
                <div id="name-cont">
                    <p class="name">` + owner.first_name + ` ` + owner.last_name + `</p>
                    <p class="edit-icon"><a href="profile-edit-page.html"><icon class="fa fa-pencil"></icon></a></p>
                    <p class="services" id="service-select">Vendor</span></p>
                    <p class="community" id="community-select">` + env.name + `</p>
                    <p class="rating">Average rating: <span id="">` + owner.rating + `</span><icon class="fa fa-star"></icon></span></p>
                    <p class="bio">` + owner.note + `</p>
                </div>
                <div id="contact-cont">
                    <div id="uploader-phone">
                        <p class="contact"><icon class="fa fa-phone"><a href="tel:` + owner.phone_no + `" class="contact-links"> ` + owner.phone_no + `</a></icon></p>
                    </div>
                    <div id="uploader-whatsapp">
                        <p class="contact"><icon class="fa fa-whatsapp"><a href="https://api.whatsapp.com/send?phone=+234` + owner.phone_no + `"
                            class="contact-links"> `+ owner.phone_no + `</a></icon></p>
                    </div>
                </div>`)
        })
    })
})

// Load reviews
$(function (){
    get('/users/' + userId + '/reviews')
    .then((reviews) => {
        if (reviews.length === 0){
            $('#latest-review-cont').html('<p id="review-message"> You have no reviews yet.</p>')
            $('#other-review-cont').addClass('disappear');
        } else {
            $('#view-review').html(`<p>View all>>></p>`)
            window.localStorage.setItem('revieweeId', userId);
            get('/users/' + reviews[0].reviewer)
            .then((reviewer) => {
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
            })
        }
    }).catch((err) => {
        errorHandler(err, "Could not load user reviews");
    })
})

// Load user products
$(function() {
    get('/users/' + userId + '/products')
    .then((products) => {
        if (products.length < 2) {
            $('#view-more-button').addClass('disappear');
        }
        get('/users/' + userId)
        .then((owner) => {
            get('/environments/' + owner.com_res)
            .then((env) => {
                $('#first-apart').html('')
                $('view-more-cont').html('')
                $.each(products, function(index, product){
                    if (index === 0) {
                        var pos = 'first-apart'
                    } else {
                        var pos = 'view-more-cont'
                    }
                    $('#' + pos).append(`<div id="output-cont" class="output-containers">
                        <div id="info-` + product.id + `">
                            <div id="image-cont">
                                <img src="` + product.image1 + `" id="img1" class="product-imgs">
                            </div>
                            <div id="text-cont">
                                <p class="product-results"><span class="product-name">` + product.name + ` </span></p>
                                <p class="price-results"><span class="product-price" id="product-price-1">N` + product.price + `</span></p>
                                <p class="ven-location">Vendors location: <span class="community">` + env.name + `</span></p>
                            </div>
                        </div>
                    </div>`)

                    $('#info-' + product.id).on('click', function(){
                        window.localStorage.setItem('productId', product.id);
                        window.location.href = 'product-info-page2.html';
                    })
                })
            })
        })
    }).catch((err) => {
        errorHandler(err, "Could not load user products now.");
    })
})
