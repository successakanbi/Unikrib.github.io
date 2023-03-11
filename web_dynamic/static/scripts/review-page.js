#!/usr/bin/node

const reviewee = window.localStorage.getItem('revieweeId');
const currentUser = window.localStorage.getItem('newId');
console.log(reviewee)

// Load user name
$(function (){
    get('/users/' + reviewee)
    .then((user) => {
        $('#fname').text(user.first_name + "'s");
        $('#fname2').text(user.first_name);
    }).catch((err) => {
        errorHandler(err, "Could not load owner name");
    })
})

// load all reviews for the user
$(function (){
    get('/users/' + reviewee + '/reviews')
    .then((reviews) => {
        $.each(reviews, function(index, review) {
            get('/users/' + review.reviewer)
            .then((reviewer) => {
                var star = parseInt(review.star)
                if (star >= 4) {
                    var code = 'positive'
                } else if(star == 3) {
                    var code = 'average'
                } else {
                    var code = 'poor'
                }
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
                            <p><span id="stars">` + review.star + `</span><icon class="fa fa-star" id="` + code + `"></icon></p>
                        </div>
                        <div class="time-stamp-cont">
                            <p class="time-stamp">` + review.updated_at.slice(0, 10) + `</p>
                        </div>
                    </div>
                </div>`)
            })
        })
    }).catch((err) => {
        errorHandler(err, "Could not load user reviews");
    })
})

//Post new reviews
$(function (){
    $("#submit").on('click', function (){
        if (reviewee === currentUser){
            alert("You cannot leave a review for yourself");
            return;
        }
        var payload = JSON.stringify({
            "star": $('#transact-rating :selected').val(),
            "text": $('#text').val(),
            "reviewer": currentUser,
            "reviewee": reviewee,
        })
        post('/reviews', payload)
        .then(() => {
            alert("Review added successfully")
            window.location.reload();
        }).catch((err) => {
            errorHandler(err, "Failed to add review")
            alert(err.responseJSON)
        })
    })
});