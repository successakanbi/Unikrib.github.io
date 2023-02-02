//displays search parameters in search result heading
function searchParameter() {
    let community = document.getElementById("location-search").value;
    let category = document.getElementById("product-category").value;
    let name = document.getElementById("product-search-box").value;
     document.getElementById("search-filter").innerHTML = 
     "Search results for " + name + " in " + community;
}

//toggles see more button between visible and hidden
//make view more container visible
function viewMore() {
    var self = document.getElementById("view-more-button");
    var more = document.querySelector("#view-more-cont");
    var result = document.querySelector("#num-results");
    more.style.display = "block";
    self.style.display = "none";
    result.innerHTML = "1 - 20";
}
//changes the search button colour from green to purple
var button = document.getElementById("apartment-search");
button.addEventListener("click", changeColor)

function changeColor() {

    button.style.backgroundColor = "purple"
}
