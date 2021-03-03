//global variables
let dateClass = $(".date").toArray();
let tempClass = $(".temp").toArray();
let humidityClass = $(".humidity").toArray();
let date = moment().format("L");
let iconArray = $(".weather_icon").toArray();
let SearchHistoryBtn = $(".searchBtn").toArray();
let userSearchArray = [];

/// User clicks the "search button", generate weather data for that city
$(".searchBtn").on("click", function() {
    event.preventDefault();
    userSearch = $("#userSearch").val();

    // Append user search to search history unless that city is already in their search history
    if ($("#userSearch").val() !== "") {
    let userSearchP = $("<button>" + userSearch + "</button>");
    userSearchP.attr("data-city", $("#userSearch").val());
    userSearchP.addClass("searchHistoryBtn btn btn-outline-primary");

    let newCity = userSearchP.attr("data-city");

    if (userSearchArray.includes(newCity)) {
        }

    else {
        $("#search_history").append(userSearchP);
        userSearchArray.push(newCity);
        storeSearchHistory();
        }
    
    getWeatherData(userSearch);
    storeLastSearch();
    $("#userSearch").val("");
    }

});

//show weather data for searched city
$("#search_history").on("click", ".searchHistoryBtn", function() {
    let userSearch = $(this).attr("data-city");
    getWeatherData(userSearch);
    console.log('test')
});

// Store the users last search to localStorage
function storeLastSearch() {
let userSearch = $("#userSearch").val();
localStorage.setItem("lastSearch", JSON.stringify(userSearch));
};

// Store user search history to localStorage
function storeSearchHistory() {
    localStorage.setItem("searchHistory", JSON.stringify(userSearchArray))
};

function init() {
    let lastSearch = JSON.parse(localStorage.getItem("lastSearch"));
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory"));

    if (userSearch !== null) {
        getWeatherData(lastSearch);
    }

    else if (userSearch === null) {

    };

    for (let i = 0; i < searchHistory.length; i++) {
        let userSearchP = $("<button>" + searchHistory[i] + "</button>");
        userSearchP.attr("data-city", searchHistory[i]);
        userSearchP.addClass("searchHistoryBtn btn btn-outline-primary");
        $("#search_history").append(userSearchP);
        userSearchArray.push(searchHistory[i]);        
    }
};

//generate the weather data
function getWeatherData(userSearch) {
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userSearch + "&appid=67f078be990d29423078c6334abd8c25";

    // Use lat and lon to generate URL to retrieve daily forecast
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    let lat = response.city.coord.lat;
    let lon = response.city.coord.lon;

    $("#cityName").text(response.city.name + " " + date);

let newQueryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&long" + lon + "&appid=67f078be990d29423078c6334abd8c25";

    // ajax call to get daily forecast
    $.ajax({
    url: newQueryURL,
    method: "GET"
    }).then(function(response) {
    console.log(newQueryURL)

//update current day
let currentTempK = response.curent.temp;
let currentTempF = ((currentTempK - 273.15) * 1.80 + 32).toFixed(0);

$("#currentTemp").text("Temperature: " + currentTempF);
$("#currentHumidity").text("Humidity: " + response.current.humidity + "%");
$("#currentWS").text("Wind Speed: " + response.current.wind_speed + "MPH");
$("#uvIndex").text(response.current.uvi);
$("#main-weather-icon").addClass("large-icon");
$("#main-weather-icon").attr("src", "http://openweathermap.org/img/wn/" + response.current.weather[0].icon + "@2x.png");

//5day forecast
for (let i = 0; i < 5; i++) {
    let daily = response.daily;
    let tempK = daily[i].temp.day;
    let tempF = ((tempK - 273.15) * 1.80 + 32).toFixed(0);
    let humidity = daily[i].humidity;
    let icon = daily[i].weather[0].icon;

    tempClass[i].innerHTML = "Temperature: " + tempF;
    humidityClass[i].innerHTML = "Humidiity: " + humidity + "%";
    $(".weather_icon").addClass("small-icon");
    iconArray[i].setAttribute("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png");
    
}

}