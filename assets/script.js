//global variables
let dateClass = $(".date").toArray();
let tempClass = $(".temp").toArray();
let humidityClass = $(".humidity").toArray();
let date = moment().format("L");
let iconArray = $(".weather_icon").toArray();
let SearchHistoryBtn = $(".searchBtn").toArray();
let userSearchArray = [];

//search button generates weather
$(".searchBtn").onclick("click", function() {
    event.preventDefault();
    userSearch = $("#userSearch").val();

//add search to search history unless it is already there
    if ($("#userSearch").val() !== "") {
        let userSearchP = $("<button>" + userSearch + "</button>");
        userSearchP.attr("data-city", $("#userSearch").val());
        userSearchP.addClass("searchHistoryBtn btn btn-outline-primary");

        let newCity = userSearchP.attr("data-city");

        if (userSearchArray.includes(newCity)) {
        }

        else {
            $("#search-history").append(userSearchP);
            userSearchArray.push(newCity);
            storeSearchHistory();
        }

    getWeatherData(userSearch);
    storeLastSearch();
    $("#userSearch").val("");
    }
    
});