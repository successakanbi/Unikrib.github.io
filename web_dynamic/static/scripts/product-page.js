//displays search parameters in search result heading
function searchParameter() {
    let community = $("#location-search :selected").text();
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
}

//changes the search button colour from green to purple
var button = document.getElementById("product-search");
button.addEventListener("click", changeColor)

function changeColor() {

    button.style.backgroundColor = "purple"
}

// Load all the available environments
$(function (){
    get('/environments')
    .then((environments) => {
        $.each(environments, function(index, env){
            $('#location-search').append('<option value="' + env.id + '">' + env.name + '</option>')
        })
    }).catch((err) => {
        errorHandler(err, "Could not load environments");
    })
})

// Load all the available categories
$(function (){
    get('/categories')
    .then((cats) => {
        $.each(cats, function(index, cat){
            $('#product-category').append('<option value="' + cat.id + '">' + cat.name + '</option>');
        })
    }).catch((err) => {
        errorHandler(err, "could not load available categories")
    })
})

//Load all the available products
$(function (){
    get('/products/' + '?available=yes')
    .then((prods) => {
        if (prods.length === 0){
            $('#num-results').text('0 - 0');
            $('#view-more-button').addClass('disappear')
        } else if (prods.length < 10){
            $('#num-results').text('1 - ' + prods.length);
            $('#view-more-button').addClass('disappear')
        } else {
            $('#num-results').text('1 - 9');
        }
        $('#total-length').text(prods.length);
        $('#view-more-cont').html('')
        $.each(prods, function(index, prod){
            get('/users/' + prod.owner_id)
            .then((owner) => {
                get('/environments/' + owner.com_res)
                .then((env) => {
                    if (index < 9){
                        var cont = 'all-products'
                    } else {
                        var cont = 'view-more-cont'
                    }
                    $('#' + cont).append(`<div id="output-cont" class="output-containers">
                        <div id="` + prod.id + `">
                        <div id="image-cont">
                            <img src="` + prod.image1 + `" id="img1" class="product-imgs">
                        </div>
                        <div id="text-cont">
                            <p class="product-results"><span class="product-name">` + prod.name + ` </span></p>
                            <p class="price-results"><span class="product-price" id="product-price-1">N` + prod.price + `</span></p>
                            <p class="ven-location">Vendors location: <span class="community">` + env.name + `</span></p>
                        </div>
                        </div>
                    </div>`)
                    $(function (){
                        $("#" + prod.id).on('click', function(){										                                        
                            var user = window.localStorage.getItem('newId');
                            if (user === null) {
                                alert("Please log in or create an account first")
                                window.location.href = 'login.html';
                            } else {
                                window.localStorage.setItem('productId', prod.id);											
                                window.location.href = 'product-info-page.html';
                            }
                        });
                    });
                })
            })
        })
    }).catch((err) => {
        errorHandler(err, "Could not load available products");
    })
})

//Load search results
$(function (){
    $('#product-search').on('click', function(){
        var payload = JSON.stringify({
            "location": $('#location-search :selected').val(),
            "category": $('#product-category :selected').val(),
            "query": $('#product-search-box').val(),
        });
        post('/product-search', payload)
        .then((products) => {
            alert('Search returned ' + products.length + ' results.')
            $('#all-products').html('')

            if (products.length === 0){
                $('#num-results').text('0 - 0');
                $('#view-more-button').addClass('disappear')
            } else if (products.length < 10){
                $('#num-results').text('1 - ' + products.length);
                $('#view-more-button').addClass('disappear')
            } else {
                $('#num-results').text('1 - 9');
            }
            $('#total-length').text(products.length);
            $('#view-more-cont').html('')

            $.each(products, function(index, prod){
                get('/users/' + prod.owner_id)
                .then((owner) => {
                    get('/environments/' + owner.com_res)
                    .then((env) => {
                        if (index < 9){
                            var cont = 'all-products'
                        } else {
                            var cont = 'view-more-cont'
                        }
                        $('#' + cont).append(`<div id="output-cont" class="output-containers">
                            <div id="` + prod.id + `">
                            <div id="image-cont">
                                <img src="` + prod.image1 + `" id="img1" class="product-imgs">
                            </div>
                            <div id="text-cont">
                                <p class="product-results"><span class="product-name">` + prod.name + ` </span></p>
                                <p class="price-results"><span class="product-price" id="product-price-1">N` + prod.price + `</span></p>
                                <p class="ven-location">Vendors location: <span class="community">` + env.name + `</span></p>
                            </div>
                            </div>
                        </div>`)
                        $(function (){
                            $("#" + prod.id).on('click', function(){										                                        
                                var user = window.localStorage.getItem('newId');
                                if (user === null) {
                                    alert("Please log in or create an account first")
                                    window.location.href = 'login.html';
                                } else {
                                    window.localStorage.setItem('productId', prod.id);											
                                    window.location.href = 'product-info-page.html';
                                }
                            });
                        });
                    })
                })
            })
        }).catch((err) => {
            errorHandler(err, "Could not load search results");
        })
    })
})