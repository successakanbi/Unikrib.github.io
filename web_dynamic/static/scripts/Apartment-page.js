//displays search parameters in search result heading
function searchParameter() {
    let community = $("#location-search :selected").text();
    let type = $("#Apartment-type :selected").text();
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

    get('/houses/stats')
    .then((count) => {
        $("#num-results").text('1 - ' + count);
    }).catch(() => {
        alert("The apartment stats cannot be gotten at this time");
    })
}

// changes the search button colour from green to purple
var button = document.getElementById("apartment-search");
button.addEventListener("click", changeColor)

function changeColor() {

    button.style.backgroundColor = "purple"
}
