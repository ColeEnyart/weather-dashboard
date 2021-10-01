var searchButtonEl = $("#button");
var searchTextEl = $("#searchText");

var currentCityEl = $(".currentCity");
var currentIconEl = $(".img");
var currentTempEl = $(".currentTemp");
var currentWindEl = $(".currentWind");
var currentHumidityEl = $(".currentHumidity");
var currentUvEl = $(".currentUv");

var apiKey = "2d3a1cce99e743cff7d93da2fd8af998";
var city = "";




function getCurrentApi(event) {
    event.preventDefault();
    city = searchTextEl.val();

    var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + /*city*/"San Diego" + "&appid=" + apiKey + "&units=imperial";
    
    fetch(queryUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        populateCurrent(data);
    })
}

function getFiveDayApi(event) {
    event.preventDefault();
    city = searchTextEl.val();

    var queryUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + /*city*/"San Diego" + "&appid=" + apiKey + "&units=imperial";
    
    fetch(queryUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        populateFiveDay(data);
    })
}


function populateCurrent(data) {
    var test1 = data.name;
    var test1a = "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
    var test2 = data.main.temp;
    var test3 = data.wind.speed;
    var test4 = data.main.humidity;
    console.log(test1);
    console.log("Temp: " + test2);
    console.log("Wind: " + test3);
    console.log("Humidity: " + test4);

    currentCityEl.append(test1);
    currentIconEl.attr("src", test1a);
    currentTempEl.append("Temp: " + test2 + " &deg;F");
    currentWindEl.append("Wind: " + test3 + " MPH");
    currentHumidityEl.append("Humidity: " + test4 + " %");
}

function populateFiveDay(data) {
    /* var test1a = "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
    var test2 = data.main.temp;
    var test3 = data.wind.speed;
    var test4 = data.main.humidity; */
    /* console.log("Temp: " + test2);
    console.log("Wind: " + test3);
    console.log("Humidity: " + test4); */
    
    
    for(var i = 3; i < data.list.length; i += 8) {
        var five1 = data.list[i].dt_txt;
        var five2 = data.list[i].main.temp;
        var five3 = data.list[i].wind.speed;
        var five4 = data.list[i].main.humidity;
        console.log(five1);
        console.log("Temp: " + five2);
        console.log("Wind: " + five3);
        console.log("Humidity: " + five4);
        
    }

    /* currentCityEl.append(test1);
    currentIconEl.attr("src", test1a);
    currentTempEl.append("Temp: " + test2 + " &deg;F");
    currentWindEl.append("Wind: " + test3 + " MPH");
    currentHumidityEl.append("Humidity: " + test4 + " %"); */
}


searchButtonEl.on("click", getCurrentApi);
searchButtonEl.on("click", getFiveDayApi);
