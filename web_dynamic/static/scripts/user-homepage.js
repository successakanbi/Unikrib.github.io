#!/usr/bin/node
const userId = window.localStorage.getItem('newId');


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
                    <p class="name">` + owner.first_name + ` ` + owner.last_name + `</p>
                    <p class="edit-icon"><a href="profile-edit-page.html"><icon class="fa fa-pencil"></icon></a></p>
                    <p class="community" id="community-select">` + env.name + `</p>
                    <p class="email"> <icon class="fa fa-envelope"></icon> ` + owner.email + `</p>
                </div>
                <div id="contact-cont">
                    <div id="uploader-phone">
                        <p class="contact"><icon class="fa fa-phone"><a href="tel:` + owner.phone_no + `" class="contact-links"> ` + owner.phone_no + `</a></icon></p>
                    </div>
                    <div id="uploader-whatsapp">
                        <p class="contact"><icon class="fa fa-whatsapp"><a href="https://api.whatsapp.com/send?phone=+234` + owner.phone_no + `"
                        class="contact-links"> ` + owner.phone_no + `</a></icon></p>
                    </div>
                </div>`
            )
        })
    }).catch((err) => {
        errorHandler(err, "Could not load user details");
    })
})