#!/usr/bin/node

//load environments
$(function() {
	$.ajax({
		type: 'GET',
		url: 'http://localhost:8000/unikrib/environments',
		data: {},
		contentType: 'application/json',
		dataType: 'json',
		success: function(items) {
			$.each(items, function(index, item) {
				$("#location-search").append("<option value='" + item.id + "'>" + item.name + "</option>");
			});
		},
		error: function() {
			alert("Could not load available environments")
		},
	});
});

//Get House stats
$(function (){
	$.ajax({
		type: 'GET',
		url: 'http://localhost:8000/unikrib/houses/stats',
		data: {},
		contentType: 'application/json',
		dataType: 'json',
		success: function(count) {
			$("#stats").text(count)
			if (parseInt(count) < 10){
				$("#num-results").text('1 - ' + count)
				$("#view-more-button").addClass('disappear')
			} else {
				$("#num-results").text('1 - 9')
			};
		},
		error: function(){
			alert("Could not load house stats");
		},
	});
});

// populate all houses
$(function (){
	$.ajax({
		type: 'GET',
		url: 'http://localhost:8000/unikrib/houses',
		data: {},
		contentType: 'application/json',
		dataType: 'json',
		success: function(items) {
			$("#all-apartments").html('')
			$.each(items, function(index, house) {
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
							dataType: 'json',
							success: function(env) {
								if (house.image1 === null){
									var src1 = "images/student-dorm.jpg";
								} else {
									var src1 = house.image1;
								}
								if (index < 9) {
									$("#all-apartments").append(`<div id="output-cont" class="output-containers">
                                                                                  <div id="info-` + house.id + `">
                                                                                    <div id="image-cont">
                                                                                      <img src="` + src1 + `" id="img1">
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
                                                                                </div>`);
									
								} else {
									$.ajax({
										type: 'GET',
										url: 'http://localhost:8000/unikrib/houses/stats',
										data: {},
										contentType: 'application/json',
										dataType: 'json',
										success: function (count) {
											$("#view-more-cont").append(`<div id="output-cont" class="output-containers">
                                	                                                  <div id="info-` + house.id + `">
                                        	                                            <div id="image-cont">
                                                	                                      <img src="` + src1 + `" id="img1">
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
                                                	                                </div>`);

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
										},
									});
								};
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
							},
							error: function(){
								alert("Could not load house environment");
							},
						});
					},
					error: function(){
						alert("Could not load house street");
					},
				});
			});
		},
		error: function() {
			alert("Could not load houses");
		},
	});
});

// load search results
$(function (){
	$("#button-cont").on('click', function() {
		environment = $("#location-search :selected").val()
		$.ajax({
			type: 'GET',
			url: 'http://localhost:8000/unikrib/environments/' + environment + '/streets',
			data: {},
			contentType: 'application/json',
			dataType: 'json',
			success: function (str_id) {
				search_dict = {
					"apartment": $("#Apartment-type :selected").val(),
					"min_price": $("#minimum-price :selected").val(),
					"max_price": $("#maximum-price :selected").val(),
					"streets" : str_id,
				};
				$.ajax({
					type: 'POST',
					url: 'http://localhost:8000/unikrib/houses/search',
					data: JSON.stringify(search_dict),
					contentType: 'application/json',
					dataType: 'json',
					success: function(items) {
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
							$.ajax({
								type: 'GET',
								url: 'http://localhost:8000/unikrib/houses/' + item.id,
								data: {},
								contentType: 'application/json',
								dataType: 'json',
								success: function(house) {
									$.ajax({
										type: 'GET',
										url: 'http://localhost:8000/unikrib/streets/' + house.street_id,
										data: {},
										contentType: 'application/json',
										dataType: 'json',
										success: function(street) {

											if (house.image1 === null){
												var src1 = "images/student-dorm.jpg";
											} else {
												var src1 = house.image1;
											}

											if (index < 10) {
												$("#all-apartments").append(`<div id="output-cont" class="output-containers">
												          <div id="info-` + house.id + `">
												            <div id="image-cont">
												              <img src="` + src1 + `" id="img1">
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
											} else {
												$("#view-more-cont").append(`<div id="output-cont" class="output-containers">
																				<div id="info-` + house.id + `">
																				<div id="image-cont">
																				<img src="` + src1 + `" id="img1">
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
																				</div>`)												
											};
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

										},
										error: function() {
											alert("Could not load house street");
										},
									});
								},
							});
						});
					},
					error: function() {
						alert("Search could not be completed, please try later")
					},
				});
			},
			error: function() {
				alert("Could not load search result for the selected location");
			},
		});
	});
});
