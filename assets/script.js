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
}