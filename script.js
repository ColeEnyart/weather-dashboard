var searchButtonEl = $("#button");
var searchTextEl = $("#searchText");

var currentCityEl = $(".currentCity");
var currentIconEl = $(".img");
var currentTempEl = $(".currentTemp");
var currentWindEl = $(".currentWind");
var currentHumidityEl = $(".currentHumidity");
var currentUvEl = $(".currentUv");

var forecastDateEl = $(".forecastDate");
var forecastIconEl = $(".forecastIcon");
var forecastTempEl = $(".forecastTemp");
var forecastWindEl = $(".forecastWind");
var forecastHumidityEl = $(".forecastHumidity");

var apiKey = "2d3a1cce99e743cff7d93da2fd8af998";
var cityName = "";

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

function populateForecast(data) {
    for(var i = 3; i < data.list.length; i += 8) {
        var five1 = data.list[i].dt_txt;
        var five1a = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
        var five2 = data.list[i].main.temp;
        var five3 = data.list[i].wind.speed;
        var five4 = data.list[i].main.humidity;
        console.log(five1);
        console.log(five1a);
        console.log("Temp: " + five2);
        console.log("Wind: " + five3);
        console.log("Humidity: " + five4);
        
    }
    forecastDateEl.append(five1);
    forecastIconEl.attr("src", five1a);
    forecastTempEl.append("Temp: " + five2 + " &deg;F");
    forecastWindEl.append("Wind: " + five3 + " MPH");
    forecastHumidityEl.append("Humidity: " + five4 + " %");
}

function getLatLong(cityName, event) {
    event.preventDefault();
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + /* cityName */"San Diego" + "&appid=" + apiKey;
    fetch(url)
    .then( function(response) {
        if (response.ok) {
            response.json().then( function(data) {
                /* console.log(data); */
                
                var q1 = data.coord;
                console.log(q1);
                var lat = data.coord.lat;
                console.log(lat);
                var lon = data.coord.lon;
                console.log(lon);
                
                getCityData(lat, lon);
            })
        }
    })
}

function getCityData (lat, lon) {
    var url2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";
    fetch(url2)
    .then( function(response) {
        if (response.ok) {
            response.json().then( function(data) {
                console.log(data);
                
                
                
                
            })
        }
    })
}

searchButtonEl.on("click", getLatLong);