
var conf = {
    currentWeather: {
        api: 'AccuWeather',
        url: "https://dataservice.accuweather.com//currentconditions/v1/187684?apikey=wo8dGPxwRfk33Pd46YZiMmSisAesF70u&language=HU-hu&details=true"
    },
 
    hourlyWeather: {
     api: 'AccuWeather',
     url: "https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/187684?apikey=wo8dGPxwRfk33Pd46YZiMmSisAesF70u&language=hu-HU&details=true&metric=true"
    },
 
    dailyWeather: {
     api: 'AccuWeather',
     url: "https://dataservice.accuweather.com/forecasts/v1/daily/5day/187684?apikey=wo8dGPxwRfk33Pd46YZiMmSisAesF70u&language=hu-HU&details=true&metric=true"
    }
 };

var element = document.getElementsByClassName('weather_app')[0];
var weatherApp = new WeatherApp(element, conf).draw();


//mukodj

/*loadCurrent();
loadHourly();
loadDaily();*/