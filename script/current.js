function CurrentWeather(configuration) {
    this.configuration = configuration;
}

CurrentWeather.prototype.generateContent = function () {
    var result = '<div class="current-weather"></div>';
    return result;
};

CurrentWeather.prototype.refresh = function () {
    var element = document.getElementsByClassName('current-weather')[0];
    request('GET',this.configuration.url, function(currentData) {
        let currentTemp = currentData[0].Temperature.Metric.Value;
        let currentWeather = currentData[0].WeatherText;
        let icon = getIcon(currentData.WeatherIcon);

        element.innerHTML = this.drawCurrentSection(currentTemp, currentWeather);
    }.bind(this)); //the callback function must be binded to the THIS scope!!!
};


CurrentWeather.prototype.drawCurrentSection = function (temp, weather) {
    var sectionHTML = '';

    sectionHTML += '<section class="current">';
    sectionHTML += this.drawCurrent(temp, weather);
    sectionHTML += '</section>';
    return sectionHTML;
}

CurrentWeather.prototype.drawCurrent = function (temp, weather) {
    var currentHTML = '';

    //currentHTML += '<section class="main">';
    currentHTML += '<div class="container">';
    currentHTML += '<div class="location">';
    currentHTML += '<p>Hódmezővásárhely</p>';
    currentHTML += '</div>';
    currentHTML += '<div class="temp">';
    currentHTML += '<p class="temp__num">' + temp + '°' + '</p>';
    currentHTML += '</div>';
    currentHTML += '<div class="weather">';
    currentHTML += weather;
    currentHTML += '</div>';
    currentHTML += '</div>';
    //currentHTML += '</section>';

    return currentHTML;
}