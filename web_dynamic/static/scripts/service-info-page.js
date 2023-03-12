#!/usr/bin/env python3

const serviceId = window.localStorage.getItem('serviceId');

// Load service images
$(function(){
    get('/services/' + serviceId)
    .then((service) => {
        var count = 0;
        serviceImages = []
        if (service.image1 != null){
            count += 1;
            serviceImages.push(service.image1)
        }
        if (service.image2 != null) {
            count += 1;
            serviceImages.push(service.image2)
        }
        if (service.image3 != null){
            count += 1;
            serviceImages.push(service.image3)
        }
        if (service.image4 != null){
            count += 1;
            serviceImages.push(service.image4)
        }
        if (service.image5 != null){
            count += 1;
            serviceImages.push(service.image5)
        }
            
        var rem = 5 - serviceImages.length;
        for (var i=0; i<rem; i++){
            serviceImages.push("images/campus_housing-220520-0109.jpg")  // To be replaced with a blank image
        }
        for (var i=1; i<=5; i++){
            $('#images').append(`<div class="slides">
            <div id="numbertext"> ` + i + ` / 5  </div>
            <img src="` + serviceImages[i-1] + `" class="sldimgs" id="descript-img-` + i + `"/>         
            </div>`)
        }
            
        for (var i=1; i<=5; i++){
            $('#rw').append(`<div class="column" id="current-"` + i + `>
                <img class="small-Imgs" src="` + serviceImages[i-1] + `" >
            </div>`)
            $(function() {
                $('#current-' + i).on('click', function(){
                    showSlides(slideIndex = i)
                })
            })
        }

        let slideIndex = 1;
        showSlides(slideIndex);

        $('#plusSlides').on('click', function() {
            showSlides(slideIndex += -1);
        })
        $('#minusSlides').on('click', function() {
            showSlides(slideIndex += 1)
        })
            
        function showSlides(n){
            let i;
            let slides = document.getElementsByClassName("slides");
            let dots = document.getElementsByClassName("small-Imgs");
            let captionText = document.getElementById("caption");
            if (n > slides.length) {slideIndex = 1}
            if(n < 1) {slideIndex = slides.length}
            for(i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";  
            }
            for(i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace("active", "");   
            }
            slides[slideIndex-1].style.display = "block";
            dots[slideIndex-1].className += " active";
            captionText.innerHTML = dots[slideIndex-1].alt;
        }
    })
})

// Load owner details
$(function (){
    get('/services/' + serviceId)
    .then((service) => {
        get('/users/' + service.owner_id)
        .then((owner) => {
            window.localStorage.setItem('serviceOwner', owner.id);
            get('/environments/' + owner.com_res)
            .then((env) => {
                get('/service-categories/' + service.category_id)
                .then((cat) => {
                    $('#profile-cont').append(`<div id="profile-pic-cont">
                        <img src="` + owner.avatar + `">
                    </div>
                    <div id="name-cont">
                        <p class="name">` + owner.first_name + ` ` + owner.last_name + `</p>
                        <p class="services" id="service-select">` + cat.name + `</span></p>
                        <p class="community" id="community-select">` + env.name + `</p>
                        <p class="rating">Average rating: <span id="">` + owner.rating.toFixed(1) + `</span><icon class="fa fa-star"></icon></span></p>
                        <p class="bio">` + service.description + `</p>
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
            })
        })
    }).catch((err) => {
        errorHandler(err, "Could not load owner details");
    })
})

// Load reviews
$(function (){
    get('/services/' + serviceId)
    .then((service) => {
        get('/users/' + service.owner_id)
        .then((owner) => {
            window.localStorage.setItem('revieweeId', owner.id);
            get('/users/' + owner.id + '/reviews')
            .then((reviews) => {
                if (reviews.length === 0){
                    $("#latest-review-cont").html('<p id="review-message"> No reviews has been left for this vendor yet.</p>');
                    $("#view-review").text('Be the first to leave a review');
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
                        if (reviews.length === 1){
                            $("#view-review").text('Add a new review');
                        } else {
                            $("#review-length").text(reviews.length - 1)															
                        }
                    })
                }
            })
        })
    }).catch((err) => {
        errorHandler(err, "Could not load owner reviews");;
    })
})