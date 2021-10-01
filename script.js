var searchButtonEl = $("#button");
var searchTextEl = $("#searchText");
/* var searchCity = $(".first");
var showApi = $(".second"); */

var apiKey = "2d3a1cce99e743cff7d93da2fd8af998";
var city = "";




function getApi(event) {
    event.preventDefault();
    city = searchTextEl.val();
    console.log(city);

    var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    
    fetch(queryUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        populateWebPage(data);
    })
}





function populateWebPage(data) {
    var test1 = data.name + data.weather[0].icon;
    var test2 = data.temp;
    var test3 = data.wind.speed;
    var test4 = data.main.humidity;
    console.log(test1);
    console.log("Temp: " + test2);
    console.log("Wind: " + test3);
    console.log("Humidity:" + test4);
}


searchButtonEl.on("click", getApi);
