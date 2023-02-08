/*var user = window.localStorage.getItem('newId');
if (user === null){
    var dropdown = document.getElementsByClassName('dropdown')
    dropdown.style.display = 'none'
}*/

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
