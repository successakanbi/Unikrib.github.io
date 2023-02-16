const user = window.localStorage.getItem('newId')
var login = document.getElementById('login-cont')
var dropdown = document.getElementById('dropdown')
if (user === null){
	login.style.display = 'block';
	dropdown.style.display = 'none'
} else {
	login.style.display = 'none';
	dropdown.style.display = 'block'
}

function getUserType(){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8000/unikrib/users/' + user,
        contentType: 'application/json',
        dataType: 'json',
        success: function(currentUser){
            if (currentUser.user_type === 'agent'){
                window.location.href = 'agent-homepage.html';
            } else if (currentUser.user_type === 'vendor') {
                window.location.href = 'vendor-homepage.html';
            } else if (currentUser.user_type === 'sp'){
                window.location.href = 'service-homepage.html';
            } else if (currentUser.user_type === 'regular'){
                window.location.href = 'user-homepage.html';
            }
        },
        error: function (){
            alert('Can not determine user type')
        }
    })
}

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
        if (myDropdown.classList.contains("show")) {
            myDropdown.classList.remove("show");
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
