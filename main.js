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


