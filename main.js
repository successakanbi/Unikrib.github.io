function dropMenu() {
    var x = document.getElementById("my-Top-nav");
    if (x.className === "top-nav") {
        x.className += " responsive";
    } else {
        x.className  = "top-nav";
    }
}

function changeIcon(x) {
    x.classList.toggle("change");
}
imageChange();
function imageChange() {
    let slideImage1 = document.getElementById("handyman");
    let slideImage2 = document.getElementById("pexels");
    let slideImage3 = document.getElementById("quatro");
    if(window.innerWidth < 701) {
        slideImage1.src="images/pexels-emmanuel-ikwuegbu-7861963.jpg";
        slideImage2.src="images/pexels-diva-plavalaguna-6937732.jpg";
        slideImage3.src="images/pexels-andrea-piacquadio-3960547.jpg";
    } else{
        slideImage1.src="images/handyman.jpg";
        slideImage2.src="images/pexels-ekaterina-bolovtsova-6976561.jpg";
        slideImage3.src= "images/Photo by quatro via Iwaria.jpg"
    };
    
    
}