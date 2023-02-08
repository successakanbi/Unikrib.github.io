#!/usr/bin/node

const productId = window.localStorage.getItem('productId')

// Load the product details
$(function (){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8000/unikrib/products/' + productId,
        contentType: 'application/json',
        dataType: 'json',
        success: function (product) {
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8000/unikrib/users/' + product.owner_id,
                contentType: 'application/json',
                dataType: 'json',
                success: function (user){
                    $.ajax({
                        type: 'GET',
                        url: 'http://localhost:8000/unikrib/environments/' + user.com_res,
                        contentType: 'application/json',
                        daType: 'json',
                        success: function (env) {
                            $('#product-images').append(`<div class ="currentImage change">
                            <div class="numb-text">1 / 3</div>
                            <img src="` + product.image1 + `" style="width:100%;" id="Apart-image1">
                         </div>
    
                          <div class ="currentImage change">
                               <div class="numb-text">2 / 3</div>
                               <img src="` + product.image2 + `" style="width:100%;" id="Apart-image2">
                          </div>
    
                          <div class ="currentImage change">
                               <div class="numb-text">3 / 3</div>
                              <img src="` + product.image3 + `" style="width:100%;" id="Apart-image3">
                          </div>`)
                          $(function (){
                            let slideIndex = 1;
                            showSlides(slideIndex);

                            $('#plus').on('click', function (){
                                showSlides(slideIndex += 1);
                            })

                            $('#minus').on('click', function (){
                                showSlides(slideIndex -= 1);
                            })

                            function showSlides(n) {
                                let i;
                                let slides = document.getElementsByClassName("currentImage");

                                let dots = document.getElementsByClassName("dot");

                                if (n > slides.length) {slideIndex = 1}
                                if(n < 1) {slideIndex = slides.length}
                                for(i = 0; i < slides.length; i++){
                                    slides[i].style.display = "none"
                                }
                                for(i = 0; i < dots.length; i++) {
                                dots[i].className = dots[i].className.replace(" active", "");
                                }
                                let index = slideIndex-1                                
                                slides[slideIndex-1].style.display = "block";
                                dots[slideIndex-1].className += " active";
                            }
                          })
                          $('#prod-name').text(product.name)
                          $('#product-price').text('N' + product.price)
                          $('#community').text(env.name)
                          if (product.delivery === 'yes') {
                            $('#delivery').text('Available')
                          } else {
                            $('#delivery').text('Unavailable')
                          }
                          $('#features').text(product.features)
                        },
                        error: function (){
                            alert("Could not load product details")
                        }
                    })
                }
            })
        }
    })
})

// Load the product owner details
$(function (){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8000/unikrib/products/' + productId,
        contentType: 'application/json',
        dataType: 'json',
        success: function (prod){
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8000/unikrib/users/' + prod.owner_id,
                contentType: 'application/json',
                dataType: 'json',
                success: function (owner) {
                    $.ajax({
                        type: 'GET',
                        url: 'http://localhost:8000/unikrib/environments/' + owner.com_res,
                        contentType: 'application/json',
                        dataType: 'json',
                        success: function (env){
                            $('#name').text(owner.first_name + ' ' + owner.last_name)
                            $('#community-select').text(env.name);
                            $('#uploader-phone').html('<p class="contact"><icon class="fa fa-phone"><a href="tel:' + owner.phone_no +'" class="contact-links"> ' + owner.phone_no + '</a></icon></p>')
                            $('#uploader-whatsapp').html(`<p class="contact"><icon class="fa fa-whatsapp"><a href="https://api.whatsapp.com/send?phone=` + owner.phone_no + `"
                            class="contact-links"> ` + owner.phone_no + `</a></icon></p>`)
                        }
                    })
                    
                },
                error: function (){
                    alert('Could not load product owner');
                }
            })
        },
        error: function (){
            alert('Could not load selected product')
        }
    })
})

//Load all the reviews for the owner
$(function (){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8000/unikrib/products/' + productId,
        contentType: 'application/json',
        dataType: 'json',
        success: function (product){
            window.localStorage.setItem('revieweeId', product.owner_id)
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8000/unikrib/users/' + product.owner_id + '/reviews',
                contentType: 'application/json',
                dataType: 'json',
                success: function (reviews){
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
        }
    })
})