
function WeatherApp (element, configuration) {
    this.element = element;
    this.configuration = configuration;
    this.current = new CurrentWeather (configuration.currentWeather);
    this.hourly = new HourlyWeather (configuration.hourlyWeather);
    this.daily = new DailyWeather (configuration.dailyWeather)

};

WeatherApp.prototype.draw = function() {
    var content = '';

    content += this.current.generateContent();
    content += this.hourly.generateContent();
    content += this.daily.generateContent();

    this.element.innerHTML = content;
    this.refresh();
}

WeatherApp.prototype.refresh = function() {
    this.current.refresh();
    this.hourly.refresh();
    this.daily.refresh();
};