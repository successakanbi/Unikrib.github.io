//navigation bar responsive drop menu javascript 
function dropMenu() {
    var x = document.getElementById("my-Top-nav");
    if (x.className === "top-nav") {
        x.className += " responsive";
    } else {
        x.className  = "top-nav";
    }
}

//changes the bars drop menu button to the close button
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

var loader = document.getElementById("preloader");
window.addEventListener("load", function(){
    loader.style.display = "none";
})
