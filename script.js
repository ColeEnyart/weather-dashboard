var searchButtonEl = $("#button");
var searchTextEl = $("#searchText");

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

function getLatLong(event) {
    event.preventDefault();
    cityName = searchTextEl.val();
    var url = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;
    fetch(url)
    .then( function(response) {
        if (response.ok) {
            response.json().then( function(data) {
                console.log(data);

                for(var i = 3; i < data.list.length; i += 8) {
                    var forecastDate = data.list[i].dt_txt;
                }
                forecastDateEl.append(forecastDate);
            
                var lat = data.city.coord.lat;
                console.log(lat);
                var lon = data.city.coord.lon;
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

                var currentCity = cityName;
                var currentDate = data.current.dt;
                var currentIcon = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png";
                var currentTemp = data.current.temp;
                var currentWind = data.current.wind_speed;
                var currentHumidity = data.current.humidity;
                var currentUvi = data.current.uvi;

                console.log("UV Index: " + currentUvi);

                currentCityEl.append(currentCity);
                currentDateEl.append(currentDate);
                currentIconEl.attr("src", currentIcon);
                currentTempEl.append("Temp: " + currentTemp + " &deg;F");
                currentWindEl.append("Wind: " + currentWind + " MPH");
                currentHumidityEl.append("Humidity: " + currentHumidity + " %");
                currentUviEl.append("UV Index: " + currentUvi);

                for(var i = 0; i < data.daily.length; i ++) {
                    var forecastIcon = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png";
                    var forecastTemp = data.current.temp;
                    var forecastWind = data.current.wind_speed;
                    var forecastHumidity = data.current.humidity;
                }
                forecastIconEl.attr("src", forecastIcon);
                forecastTempEl.append("Temp: " + forecastTemp + " &deg;F");
                forecastWindEl.append("Wind: " + forecastWind + " MPH");
                forecastHumidityEl.append("Humidity: " + forecastHumidity + " %");
                
                
                
            })
        }
    })
}

searchButtonEl.on("click", getLatLong);



  /* console.log(currentCity);
    console.log(currentDate);
    console.log(currentIcon);
    console.log("Temp: " + currentTemp);
    console.log("Wind: " + currentWind);
    console.log("Humidity: " + currentHumidity);
    console.log("UV Index: " + currentUvi); */