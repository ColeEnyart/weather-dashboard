// Selector for text user inputs
var searchTextEl = $("#searchText");

// Selection for current weather
var currentCityEl = $(".currentCity");
var currentDateEl = $(".currentDate");
var currentIconEl = $(".img");
var currentTempEl = $(".currentTemp");
var currentWindEl = $(".currentWind");
var currentHumidityEl = $(".currentHumidity");
var currentUviEl = $(".currentUvi");

// Selection for forecast weather
var forecastDateEl = $(".forecastDate");
var forecastIconEl = $(".forecastIcon");
var forecastTempEl = $(".forecastTemp");
var forecastWindEl = $(".forecastWind");
var forecastHumidityEl = $(".forecastHumidity");

// Global Variables
var apiKey = "2d3a1cce99e743cff7d93da2fd8af998";
var cityName = "";

// Calls api for forecast data
// Fetches longitude and latitude from cityName
// Fetches forecast data from forecast api
// Displays forecast weather into webpage
function ForecastData(cityName) {
    $("p").empty();

    var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey + "&units=imperial";
    fetch(url)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    var lat = data.city.coord.lat;
                    var lon = data.city.coord.lon;
                    var n = -1;

                    for (var i = 3; i < data.list.length; i += 8) {
                        var day = data.list[i];
                        n++;

                        var forDate = (new Date(day.dt_txt)).toShortDate();
                        var forIcon = "https://openweathermap.org/img/wn/" + day.weather[0].icon + ".png";
                        var forTemp = day.main.temp;
                        var forWind = day.wind.speed;
                        var forHum = day.main.humidity;

                        forecastDateEl.eq(n).text(forDate);
                        forecastIconEl.eq(n).attr("src", forIcon);
                        forecastTempEl.eq(n).html("Temp: " + forTemp + " &deg;F");
                        forecastWindEl.eq(n).text("Wind: " + forWind + " MPH");
                        forecastHumidityEl.eq(n).text("Humidity: " + forHum + " %");
                    }

                    CurrentData(cityName, lat, lon);
                    addCity(cityName);
                })
            }
        })
}

// Calls api for onecall data
// Fetches current data from onecall api
// Displays current weather into webpage
function CurrentData(cityName, lat, lon) {
    var url2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";
    fetch(url2)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    var curCity = cityName;
                    var curDate = (new Date(data.current.dt * 1000)).toShortDate();
                    var curIcon = "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png";
                    var curTemp = data.current.temp;
                    var curWind = data.current.wind_speed;
                    var curHumidity = data.current.humidity;
                    var curUvi = data.current.uvi;

                    currentCityEl.text(curCity);
                    currentDateEl.text(curDate);
                    currentIconEl.attr("src", curIcon);
                    currentTempEl.html("Temp: " + curTemp + " &deg;F");
                    currentWindEl.text("Wind: " + curWind + " MPH");
                    currentHumidityEl.text("Humidity: " + curHumidity + " %");
                    currentUviEl.html('UV Index: <span style="background-color:' + uviColor(curUvi) + '">' + curUvi + '</span>');
                })
            }
        })
}

// Set uv index color depending on value of uvi
function uviColor(uvi) {
    if (uvi < 3) {
        return "#289500"; // green
    } else if (uvi < 6) {
        return "#F7E400"; // yellow
    } else if (uvi < 8) {
        return "#F85900"; // orange
    } else if (uvi < 11) {
        return "#D80010"; // red
    } else {
        return "#6B49C8"; // purple
    }
}

// Add cityName to localStorage
function addCity(cityName) {
    const key = 'Search History';
    var searchHistory = JSON.parse(localStorage.getItem(key) || "[]");

    for (var i = 0; i < searchHistory.length; i++) {
        if (cityName === searchHistory[i]) {
            return;
        }
    }

    searchHistory.push(cityName);
    localStorage.setItem(key, JSON.stringify(searchHistory));

    displaySearchHistory();
}

// Display search history as buttons from localStorage
function displaySearchHistory() {
    const key = 'Search History';
    var searchHistory = JSON.parse(localStorage.getItem(key) || "[]");
    var buttons = [];

    for (var i = 0; i < searchHistory.length; i++) {
        buttons.push('<button class="btn btn-secondary col-12 addedButton">' + searchHistory[i] + '</button>');
    }

    $('.searchHistory').html(buttons.join(""));
}

// Set date to MM/DD/YYYY format
Date.prototype.toShortDate = function () {
    return (this.getMonth() + 1) +
    "/" + this.getDate() +
    "/" + this.getFullYear();
}

// When document is ready then display search history buttons
$(document).ready(function () {
    displaySearchHistory();

    $('form.first').submit(function (event) {
        event.preventDefault();

        var cityName = event.originalEvent.submitter.textContent;

        if (cityName === "Search") {
            cityName = searchTextEl.val();
        }

        ForecastData(cityName);
    })
})