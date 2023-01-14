//displays search parameters in search result heading
function searchParameter() {
    let community = document.getElementById("location-search").value;
    let type = document.getElementById("Apartment-type").value;
    let minimum = document.getElementById("minimum-price").value;
    let maximum = document.getElementById("maximum-price").value;
     document.getElementById("search-filter").innerHTML = 
     "Search results for " + community + " , " + type + " from " + minimum
     + " to " + maximum;
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
