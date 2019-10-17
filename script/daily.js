function DailyWeather(configuration) {
    this.configuration = configuration;
}

DailyWeather.prototype.generateContent = function () {
    var result = '';
    result += '<div class="daily-weather"></div>';

    return result;
}

DailyWeather.prototype.refresh = function () {
    var element = document.getElementsByClassName('daily-weather')[0];
    request('GET', this.configuration.url, function (dailyData) {

        element.innerHTML = this.drawDailySection(dailyData);

    }.bind(this)); //the callback function must be binded to the THIS scope!!!
}





/*function loadDaily() {
    var nyuf = new XMLHttpRequest();

    nyuf.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var dailyData = JSON.parse(this.responseText);
          
            document.getElementsByClassName("weather_app")[0].innerHTML += drawDailySection(dailyData)
            
        };
    };

    nyuf.open("GET", "http://dataservice.accuweather.com/forecasts/v1/daily/5day/187684?apikey=wo8dGPxwRfk33Pd46YZiMmSisAesF70u&language=hu-HU&details=true&metric=true");
    nyuf.send();
}*/

DailyWeather.prototype.drawDailySection = function (data) {
    var sectionHTML = '';

    sectionHTML += '<section class="daily">';
    sectionHTML += '<div class="container">';
    sectionHTML += this.drawRows(data);
    sectionHTML += '</div>';
    sectionHTML += '</section>';
    return sectionHTML;
};

DailyWeather.prototype.drawRows = function (data) {
    dailyHTML = '';

    data.DailyForecasts.forEach(function (element) {
        var dailyTime = new Date(element.Date);

        var monthName = month[dailyTime.getMonth()];
        var dailyDate = monthName + " " + dailyTime.getDate();
        var dailyTempMin = element.Temperature.Minimum.Value;
        var dailyTempMax = element.Temperature.Maximum.Value;
        var dailyIconIndex = element.Day.Icon;
        var dailyIcon = getIcon(dailyIconIndex);

        dailyHTML += this.drawRow(dailyDate, dailyTempMax, dailyTempMin, dailyIcon);
        console.log(dailyDate, dailyTempMin, dailyTempMax, dailyIconIndex, dailyIcon);
    }.bind(this));

    return dailyHTML;
};



 DailyWeather.prototype.drawRow = function(time, tempMax, tempMin, icon) {
    var dailyHTML = '';

    dailyHTML += "<div class = forecast_daily__row>";

    dailyHTML += "<span class = forecast_daily__row__date>";
    dailyHTML += time;
    dailyHTML += "</span>";

    dailyHTML += "<span class = forecast_daily_icon>";
    dailyHTML += "<img src="+ icon +">";
    dailyHTML += "</span>";

    dailyHTML += "<span class = forecast_daily__row__temp>"
    dailyHTML += "<span class = forecast_daily__row__tempMax>";
    dailyHTML += tempMax + "°";
    dailyHTML += "</span>";
    dailyHTML += "/";
    dailyHTML += "<span class = forecast_daily__row__tempMin>";
    dailyHTML += tempMin + "°";
    dailyHTML += "</span>";
    dailyHTML += "</span>";

    dailyHTML += "</div>";

    return dailyHTML;
};