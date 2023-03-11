const user = window.localStorage.getItem('newId')
var login = document.getElementById('login-cont')
var dropdown = document.getElementById('dropdown')
if (login != undefined && dropdown != undefined) {
    if (user === null){
        login.style.display = 'block';
        dropdown.style.display = 'none'
    } else {
        login.style.display = 'none';
        dropdown.style.display = 'block'
    }
}

var help = document.getElementById('help')
if (help != undefined) {
    help.addEventListener("click", function() {
        window.location.href = 'help-page.html'
    })
}

var edit = document.getElementById('edit-profile')
if (edit != undefined) {
    edit.addEventListener("click", function() {
        window.location.href = "profile-edit-page.html";
    })
}

// Requests
var api = 'http://localhost:8000/unikrib';
function get(endpoint) {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: 'GET',
			url: api + endpoint,
			contentType: 'application/json',
            crossDomain: true,
            xhrFields: { withCredentials: false },
			dataType: 'json',
			success: function(data) {
				resolve(data);
			},
			error: function(err) {
				reject(err);
			}
		})
	})
}

function getAuth() {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: 'GET',
			url: api + '/auth-url',
			contentType: 'application/json',
			dataType: 'json',
			success: function(data) {
				resolve(data);
			},
			error: function(err) {
				reject(err);
			}
		})
	})
}

function post(endpoint, payload) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: api + endpoint,
            data: payload,
            contentType: 'application/json',
            dataType: 'json',
            success: function(data) {
                resolve(data);
            },
            error: function(err) {
                reject(err);
            }
        })
    })
}

function put(endpoint, payload) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'PUT',
            url: api + endpoint,
            data: payload,
            contentType: 'application/json',
            dataType: 'json',
            success: function(data) {
                resolve(data);
            },
            error: function(err) {
                reject(err);
            }
        })
    })
}

function getUserType(){
    get('/users/' + user)
    .then((currentUser) => {
        if (currentUser.user_type === 'agent'){
            window.location.href = 'agent-homepage.html';
        } else if (currentUser.user_type === 'vendor') {
            window.location.href = 'vendor-homepage.html';
        } else if (currentUser.user_type === 'sp'){
            window.location.href = 'service-homepage.html';
        } else if (currentUser.user_type === 'regular'){
            window.location.href = 'user-homepage.html';
        } else {
            alert("Could not determine user type")
        }
    }).catch(() => {
        alert("Could not determine the user type")
    })
}

function getCookie(cookieName){
    console.log("Cookie name = " + cookieName);
    console.log("cookies: " + document.cookie)
    var cookieArray = document.cookie.split(';');
    console.log(cookieArray);
    for(var i=0; i<cookieArray.length; i++){
        var cookie = cookieArray[i];
        console.log(cookie)
        while (cookie.charAt(0)==' '){
            cookie = cookie.substring(1);
        }
        cookieHalves = cookie.split('=');
        if(cookieHalves[0]== cookieName){
            return cookieHalves[1];
        }
    }
    return "";
}
function readURL(input, position) {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.querySelector('#' + position).setAttribute('src',e.target.result )
      };
      reader.readAsDataURL(input.files[0]);
    }
}

var loader = document.getElementById('preloader');
window.addEventListener("load", function(){
    loader.style.display = "none";
})

function dropMenu() {
    var x = document.getElementById("my-Top-nav");
    if (x.className === "top-nav") {
        x.className += " responsive";
    } else {
        x.className  = "top-nav";
    }    
}

function logout(){    
    window.localStorage.clear();
    window.location.href = 'homepage.html';
}

function changeIcon(x) {
    x.classList.toggle("change");
}
function dropDown() {
    document.getElementById("dropdown-cont").classList.toggle("show");
}
window.onclick = function(e) {
    if(!e.target.matches(".dropbtn")) {
        var myDropdown =  document.getElementById("dropdown-cont");
        if (myDropdown != undefined){
            if (myDropdown.classList.contains("show")) {
                myDropdown.classList.remove("show");
            }
        }
    }
}

function imageChange() {
    let slideImage1 = document.getElementById("handyman");
    let slideImage2 = document.getElementById("pexels");
    let slideImage3 = document.getElementById("quatro");
    if(window.innerWidth < 701) {
        slideImage1.src="../static/images/pexels-emmanuel-ikwuegbu-7861963.jpg";
        slideImage2.src="../static/images/pexels-diva-plavalaguna-6937732.jpg";
        slideImage3.src="../static/images/pexels-andrea-piacquadio-3960547.jpg";
    } else{
        slideImage1.src="../static/images/handyman.jpg";
        slideImage2.src="../static/images/pexels-ekaterina-bolovtsova-6976561.jpg";
        slideImage3.src="../static/images/Photo by quatro via Iwaria.jpg"
    };
    
    
}
function showPassword(){
    var x = document.getElementById("input-pass");
    if(x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function showToggle () {
    var icon = document.getElementById("eye-icon")
    icon.style.display="block";
}

function iconChange () {
    let x = document.getElementById("eye-icon");
    if (icon.className == "fa fa-eye") {
        icon.className = "fa fa-eye-slash";
    } else {
        icon.className = "fa fa-eye";
    }
}

function errorHandler(err, msg) {
    if (err.responseJSON != undefined) {
        alert(err.responseJSON);
    } else {
        alert(msg)
    }
}