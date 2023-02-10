#!/usr/bin/env python3

const serviceId = window.localStorage.getItem('serviceId');

// Load service images
$(function(){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8000/unikrib/services/' + serviceId,
        contentType: 'application/json',
        dataType: 'json',
        success: function (service){
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
                $('#rw').append(`<div class="column">
                    <img class="small-Imgs" src="` + serviceImages[i-1] + `" 
                    id="currentSlide` + i +`" alt=" " id="descript-img-` + i + `">
                </div>`)
                $('#currentSlide' + i).on('click', function() {
                    showSlides(slideIndex = i);
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
        }
    })
})

// Load owner details
$(function (){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8000/unikrib/services/' + serviceId,
        contentType: 'application/json',
        dataType: 'json',
        success: function(service){
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8000/unikrib/users/' + service.owner_id,
                contentType: 'application/json',
                dataType: 'json',
                success: function (owner){
                    window.localStorage.setItem('serviceOwner', owner.id)
                    $.ajax({
                        type: 'GET',
                        url: 'http://localhost:8000/unikrib/environments/' + owner.com_res,
                        contentType: 'application/json',
                        dataType: 'json',
                        success: function(env){
                            $.ajax({
                                type: 'GET',
                                url: 'http://localhost:8000/unikrib/service-categories/' + service.category_id,
                                contentType: 'appliaction/json',
                                dataType: 'json',
                                success: function (cat){
                                    $('#profile-cont').append(`<div id="profile-pic-cont">
                                    <img src="` + owner.avatar + `">
                                  </div>
                                  <div id="name-cont">
                                    <p class="name">` + owner.first_name + ` ` + owner.last_name + `</p>
                                    <p class="services" id="service-select">` + cat.name + `</span></p>
                                    <p class="community" id="community-select">` + env.name + `</p>
                                    <p class="rating">Average rating: <span id="">3</span><icon class="fa fa-star"></icon></span></p>
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
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})

// Load reviews
$(function (){
    const owner = window.localStorage.getItem('serviceOwner')
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8000/unikrib/users/' + owner + '/reviews',
        contentType: 'application/json',
        dataType: 'json',
        success: function (reviews){
            window.localStorage.setItem('revieweeId', owner);
            if (reviews.length === 0){
                $("#latest-review-cont").html('<p id="review-message"> No reviews has been left for this vendor yet.</p>');
                $("#view-review").text('Be the first to leave a review');
            } else {				
                $.ajax({
                    type: 'GET',
                    url: 'http://localhost:8000/unikrib/users/' + reviews[0].reviewer,
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
                        if (reviews.length === 1){
                            $("#view-review").text('Add a new review');
                        } else {
                            $("#review-length").text(reviews.length - 1)															
                        }
                    }
                })
            }
        }
    })
})