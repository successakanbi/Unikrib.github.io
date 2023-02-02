#!/usr/bin/node

const houseOwner = window.localStorage.getItem('houseOwnerId');
const currentUser = window.localStorage.getItem('newId');

// load all reviews for the user
$(function (){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8000/unikrib/users/' + houseOwner + '/reviews',
        data: {},
        contentType: 'application/json',
        dataType: 'json',
        success: function (reviews){
            $.each(reviews, function (index, review) {
                $.ajax({
                    type: 'GET',
                    url: 'http://localhost:8000/unikrib/users/' + review.reviewer,
                    contentType: 'application/json',
                    dataType: 'json',
                    success: function(reviewer) {
                        $("#review-right-cont").append(`<div class="review-inbox">
                            <div class="reviewer-img-cont">
                                <img src="` + reviewer.avatar + `">
                            </div>
                            <div class ="reviewer-name-cont">
                                <p id="rev-name">` + reviewer.first_name + ` ` + reviewer.last_name + `</p>
                            </div>
                            <div class="review-message-cont">
                                <p class="rev-message">` + review.text + `</p>
                                    <div class="star-cont">
                                        <p><span id="stars">` + review.star + `</span><icon class="fa fa-star" id="positive"></icon></p>
                                    </div>
                                    <div class="time-stamp-cont">
                                        <p class="time-stamp">` + review.updated_at.slice(0, 10) + `</p>
                                    </div>

                            </div>
                        </div>`)

                    }
                })

            })
            
            
        }
    })
})

//Post new reviews
$(function (){
    $("#submit").on('click', function (){
        if (houseOwner === currentUser){
            alert("You cannot leave a review for yourself");
            return;
        }
        reviewDict = {
            "star": $('#transact-rating :selected').val(),
            "text": $('#text').val(),
            "reviewer": currentUser,
            "reviewee": houseOwner,
        }
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8000/unikrib/reviews',
            data: JSON.stringify(reviewDict),
            contentType: 'application/json',
            dataType: 'json',
            success: function(){
                alert("Review added successfully");
            },
            error: function (){
                alert("An error occured while uploading review, please try again");
            }
        })
    })
});