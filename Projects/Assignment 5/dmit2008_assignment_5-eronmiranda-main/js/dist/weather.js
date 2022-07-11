const API_KEY = '52fc99a956494caea7b135022179925e';
const ENDPOINT = 'https://api.openweathermap.org/data/2.5/';

const Weather = function (options) {
  this.city = "";
  this.weatherData = {};

  if (options) {
    Object.assign(this, options);
  }
};

Weather.prototype.getCurrentWeather = function () {
  return fetch(`${ENDPOINT}weather?q=${this.city}&units=metric&appid=${API_KEY}`).then(response => response.json()).then(currentWeather => {
    const location = `${currentWeather.name}, ${currentWeather.sys.country}`;
    const date = new Date(+currentWeather.dt * 1000);
    const conditions = currentWeather.weather[0].main;
    const temperature = currentWeather.main.temp;
    const sunrise = new Date(+currentWeather.sys.sunrise * 1000);
    const sunset = new Date(+currentWeather.sys.sunset * 1000);
    return Object.assign(this.weatherData, {
      location,
      date,
      conditions,
      temperature,
      sunrise,
      sunset
    });
  });
};

Weather.prototype.getForecast = function () {
  return fetch(`${ENDPOINT}forecast?q=${this.city}&units=metric&appid=${API_KEY}`).then(response => {
    return response.json();
  }).then(data => {
    // process forecast data
    let currDate,
        nextDate,
        day = -1,
        forecast = [];
    data.list.forEach(item => {
      // destructuring for desired variables
      let {
        dt_txt: date
      } = item,
          {
        temp_max: high,
        temp_min: low
      } = item.main,
          {
        main: condition
      } = item.weather[0]; // remove the time from the date

      nextDate = date.split(' ')[0];

      if (currDate !== nextDate) {
        // a new day
        currDate = nextDate;
        day += 1; // store the new day ... just take the initial condition value

        forecast.push({
          condition,
          date: currDate,
          high,
          low
        });
      } // find the highest high and the lowest low


      if (forecast[day].high < high) {
        forecast[day].high = high;
      }

      if (forecast[day].low > low) {
        forecast[day].low = low;
      }
    }); // mixin pattern

    return Object.assign(this.weatherData, {
      forecast
    });
  });
};

export { Weather, ENDPOINT, API_KEY };