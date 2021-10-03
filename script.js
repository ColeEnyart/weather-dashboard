var searchButtonEl = $("#button");
var searchTextEl = $("#searchText");
var addedButtonEl = $(".addedButton");

var currentCityEl = $(".currentCity");
var currentDateEl = $(".currentDate");
var currentIconEl = $(".img");
var currentTempEl = $(".currentTemp");
var currentWindEl = $(".currentWind");
var currentHumidityEl = $(".currentHumidity");
var currentUviEl = $(".currentUvi");

var forecastDateEl = $(".forecastDate");
var forecastIconEl = $(".forecastIcon");
var forecastTempEl = $(".forecastTemp");
var forecastWindEl = $(".forecastWind");
var forecastHumidityEl = $(".forecastHumidity");

var apiKey = "2d3a1cce99e743cff7d93da2fd8af998";
var cityName = "";

function populateForecast(data) {

    var n = -1;

    for (var i = 3; i < data.list.length; i += 8) {

        var day = data.list[i];
        n++;

        var title = (new Date(day.dt_txt)).toShortDate();
        var five1a = "https://openweathermap.org/img/wn/" + day.weather[0].icon + ".png";
        var five2 = day.main.temp;
        var five3 = day.wind.speed;
        var five4 = day.main.humidity;

        forecastDateEl.eq(n).text(title);
        forecastIconEl.eq(n).attr("src", five1a);
        forecastTempEl.eq(n).html("Temp: " + five2 + " &deg;F");
        forecastWindEl.eq(n).text("Wind: " + five3 + " MPH");
        forecastHumidityEl.eq(n).text("Humidity: " + five4 + " %");
    }


}

function search(cityName) {

    $("p").empty();

    var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey + "&units=imperial";
    fetch(url)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {

                    var lat = data.city.coord.lat;
                    var lon = data.city.coord.lon;

                    populateForecast(data);
                    getCityData(cityName, lat, lon);
                    addCity(cityName);
                })
            }
        })
}

function getCityData(cityName, lat, lon) {
    var url2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";
    fetch(url2)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {

                    var currentCity = cityName;
                    var currentDate = (new Date(data.current.dt * 1000)).toShortDate();
                    var currentIcon = "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png";
                    var currentTemp = data.current.temp;
                    var currentWind = data.current.wind_speed;
                    var currentHumidity = data.current.humidity;
                    var currentUvi = data.current.uvi;

                    currentCityEl.text(currentCity);
                    currentDateEl.text(currentDate);
                    currentIconEl.attr("src", currentIcon);
                    currentTempEl.html("Temp: " + currentTemp + " &deg;F");
                    currentWindEl.text("Wind: " + currentWind + " MPH");
                    currentHumidityEl.text("Humidity: " + currentHumidity + " %");
                    currentUviEl.html('UV Index: <span style="background-color:' + uviColor(currentUvi) + '">' + currentUvi + '</span>');
                })
            }
        })
}


Date.prototype.toShortDate = function(){
    return (this.getMonth() + 1) + 
    "/" +  this.getDate() +
    "/" +  this.getFullYear();
}

function uviColor(uvi) {
 
    if(uvi < 3) {
        return "#289500"; // green
    } else if(uvi < 6) {
        return "#F7E400"; // yellow
    } else if(uvi < 8) {
        return "#F85900"; // orange
    } else if(uvi < 11) {
        return "#D80010"; // red
    } else {
        return "#6B49C8"; // purple
    }
}

var history = ["Austin", "Chicago", "New York"];

function addCity(cityName) {

    const key = 'Search History';

    var searchHistory = JSON.parse(localStorage.getItem(key) || "[]");

    for(var i = 0; i < searchHistory.length; i++) {
        if(cityName === searchHistory[i]) {
            return;
        }
    }

    searchHistory.push(cityName);

    localStorage.setItem(key, JSON.stringify(searchHistory));

    displaySearchHistory();
}

function displaySearchHistory() {

    const key = 'Search History';

    var searchHistory = JSON.parse(localStorage.getItem(key) || "[]");

    var buttons = [];

    for(var i = 0; i < searchHistory.length; i++) {
        buttons.push('<button class="btn btn-secondary col-12 addedButton">' + searchHistory[i] +'</button>');
    }

    $('.searchHistory').html(buttons.join(""));
}

$(document).ready(function() {
    displaySearchHistory();
    
    $('form.first').submit(function(event) {
        event.preventDefault();

        console.log(event.originalEvent.submitter);

        var cityName = event.originalEvent.submitter.textContent;

        if(cityName === "Search") {
            cityName = searchTextEl.val();
        }

        search(cityName);
       
    })
}) 