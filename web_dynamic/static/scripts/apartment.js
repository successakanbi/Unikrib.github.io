#!/usr/bin/node

//load environments
$(function() {
	get('/environments')
	.then((items) => {
		$.each(items, function(index, item) {
			$("#location-search").append("<option value='" + item.id + "'>" + item.name + "</option>");
		});
	}).catch((err) => {
		errorHandler(err, "Could not load environments, please try again later");
	})
})

//Get House stats
$(function() {
	get('/houses/stats')
	.then((count) => {
		$("#stats").text(count)
		if (parseInt(count) < 10){
			$("#num-results").text('1 - ' + count)
			$("#view-more-button").addClass('disappear')
		} else {
			$("#num-results").text('1 - 9')
		};
	}).catch((err) => {
		errorHandler(err, "Could not load apartment stats now")
	})
})

// populate all houses
$(function() {
	get('/houses')
	.then((houses) => {
		$("#all-apartments").html('')
		$.each(houses, function(index, house) {
			get('/streets/' + house.street_id)
			.then((street) => {
				get('/environments/' + street.env_id)
				.then((env) => {
					if (index < 9) {
						var cont = "all-apartments";
					} else {
						var cont = "view-more-cont";
					}
					$("#" + cont).append(`
						<div id="output-cont" class="output-containers">
							<div id="info-` + house.id + `">
								<div id="image-cont">
									<img src="` + house.image1 + `" id="img1">
								</div>
								<div id="text-cont">
									<p class="address-results"><span class="type">` + house.apartment + `</span> in <span class="hostel" id="hostel1">` + house.name + `</span> for rent
									<span class ="street" id="street1">` + street.name + ` street,</span><span class ="community" id="community1"> ` + env.name + `</span></p>
									<p class="price-results"><span class="price" id="price1">N` + house.price + `</span> per year</p>
									<div class ="icons-cont">
										<i class="fa fa-tint"></i><i class="fa fa-bolt"><span id="hours">6h</span></i><i class="fa fa-trash"></i>
									</div>
								</div>
							</div>
						</div>`
					);
					$(function (){
						$("#info-" + house.id).on('click', function(){																				
							var user = window.localStorage.getItem('newId');
							if (user === null) {
								alert("Please log in or create an account first")
								window.location.href = 'login.html';
							} else {
								window.localStorage.setItem('houseId', house.id);								
								window.location.href = 'Apartment-info-page.html';
							}
						});
					});
				})
			})
		})
	}).catch((err) => {
		errorHandler(err, "Could not load apartments, please reload the page")
	})
})

// load search results
$(function() {
	$("#button-cont").on('click', function() {
		var environment = $("#location-search :selected").val();
		get('/environments/' + environment + '/streets')
		.then((str_id) => {
			var payload = JSON.stringify({
				"apartment": $("#Apartment-type :selected").val(),
				"min_price": $("#minimum-price :selected").val(),
				"max_price": $("#maximum-price :selected").val(),
				"streets" : str_id,
			});
			post('/houses/search', payload)
			.then((items) => {
				alert("Search returned " + items.length + " results");
				$("#stats").text(items.length);
				if (items.length === 0) {
					$("#num-results").text('0 - 0');
					$("#view-more-button").addClass('disappear')
				} else if (items.length < 9) {
					$("#num-results").text('1 - ' + items.length);
					$("#view-more-button").addClass('disappear');
				} else {
					$("#num-results").text('1 - 9')
				}
				$("#all-apartments").html('');
				$("#view-more-cont").html('');
				$.each(items, function (index, item) {
					get('/houses/' + item.id)
					.then((house) => {
						get('/streets/' + house.street_id)
						.then((street) => {
							if (index < 10) {
								var cont = "all-apartments"
							} else {
								var cont = "view-more-cont"
							}
							$("#" + cont).append(`<div id="output-cont" class="output-containers">
								<div id="info-` + house.id + `">
									<div id="image-cont">
									  <img src="` + house.image1 + `" id="img1">
									</div>
									<div id="text-cont">
										<p class="address-results"><span class="type">` + house.apartment + `</span> in <span class="hostel" id="hostel1">` + house.name + `</span> for rent
										<span class ="street" id="street1">` + street.name + ` street,</span><span class ="community" id="community1"> ` + $("#location-search :selected").text() + `</span></p>
										<p class="price-results"><span class="price" id="price1">N` + house.price + `</span> per year</p>
										<div class ="icons-cont">
											<i class="fa fa-tint"></i><i class="fa fa-bolt"><span id="hours">6h</span></i><i class="fa fa-trash"></i>
										</div>
									</div>
								</div>
								</div>`);
							$(function (){
								$("#info-" + house.id).on('click', function(){										
									window.localStorage.setItem('houseId', house.id)
									var user = window.localStorage.getItem('newId');
									if (user === null) {
										alert("Please log in or create an account first")
										window.location.href = 'login.html';
									} else {											
										window.location.href = 'Apartment-info-page.html';
									}
								});
							});
						})
					})
				})
			})
		}).catch((err) => {
			errorHandler(err, "Could not load search results now, please try again");
		})
	})
})