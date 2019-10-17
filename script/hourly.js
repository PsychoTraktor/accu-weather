function HourlyWeather(configuration) {
    this.configuration = configuration;
}

HourlyWeather.prototype.generateContent = function () {
    var result = '<div class="hourly-weather"></div>';
    return result;
}

HourlyWeather.prototype.refresh = function () {
    var element = document.getElementsByClassName('hourly-weather')[0];
    request('GET', this.configuration.url, function (hourlyData) {

        element.innerHTML = this.drawHourlySection(hourlyData);

    }.bind(this)); //the callback function must be binded to the THIS scope!!!
}


/*function loadHourly() {
    var nyusz = new XMLHttpRequest();

    nyusz.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var forecastData = JSON.parse(this.responseText);

            document.getElementsByClassName("weather_app")[0].innerHTML += drawHourlySection(forecastData);

        }
    };
    nyusz.open("GET", "http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/187684?apikey=wo8dGPxwRfk33Pd46YZiMmSisAesF70u&language=hu-HU&details=true&metric=true");
    nyusz.send();
};*/
HourlyWeather.prototype.drawHourlySection = function (data) {
    var sectionHTML = '';

    sectionHTML += '<section class="hourly">';
    sectionHTML += '<div class="container">';
    sectionHTML += this.drawCards(data);
    sectionHTML += '</div>';
    sectionHTML += '</section>';
    return sectionHTML;
};

HourlyWeather.prototype.drawCards = function (data) {
    var forecastsHTML = '';

    data.forEach(function (element) {

        var forecastTime = new Date(element.DateTime);
        var forecastHour = forecastTime.getHours();
        var forecastTemp = element.Temperature.Value;
        var forecastIconIndex = element.WeatherIcon;
        var forecastIcon = getIcon(forecastIconIndex);

        forecastsHTML += this.drawCard(forecastHour, forecastTemp, forecastIcon);
    }.bind(this));

    return forecastsHTML;
};

HourlyWeather.prototype.drawCard = function (time, temp, icon) {

    var forecastHTML = '';


    forecastHTML += '<div class="forecast_hourly__card">';

    forecastHTML += '<div class="forecast_hourly__card__time">';
    forecastHTML += time + '.00';
    forecastHTML += '</div>';

    forecastHTML += '<div class="forecast_hourly__card__icon">';
    forecastHTML += "<img src="+ icon +">";
    forecastHTML += '</div>';

    forecastHTML += '<div class="forecast_hourly__card__temp">';
    forecastHTML += temp + '°';
    forecastHTML += '</div>';

    forecastHTML += '</div>';


    return forecastHTML;
};


