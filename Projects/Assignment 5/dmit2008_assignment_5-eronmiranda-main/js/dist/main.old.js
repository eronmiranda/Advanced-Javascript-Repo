import { Weather } from './weather.js';
/**
 * Simple weather display application for demonstrating AJAX for JSON and
 * best practices for JavaScript development.  The script makes use of the
 * OpenWeatherMap weather API.
 */

(() => {
  const API_KEY = '2c343c1339cb88d4d69896042723812e';
  const ENDPOINT = 'https://api.openweathermap.org/data/2.5/';
  /**
   * Displays a weather forecast for a given location.
   * @param {Object[]} data - The array of forecast weather objects.
   * @param {Object} el - The reference to the display DOM element.
   */

  const displayForecast = (weatherData, el) => {
    const title = document.createElement('h3');
    title.innerText = "Forecast";
    const list = document.createElement('ul');
    let currDate;
    let nextDate;
    let currItem;
    weatherData.forecast.forEach(forecastDay => {
      // destructuring for display variables
      const {
        condition,
        date,
        high,
        low
      } = forecastDay;
      nextDate = date;

      if (currDate !== nextDate) {
        currDate = nextDate; // create a new item

        currItem = document.createElement('li');
        currItem.classList.add('forecast-item');
        currItem.innerHTML = `<p>${currDate}</p>`;
      }

      currItem.innerHTML += `
        <div class="forecast-detail">
          <p><strong><span class="time">Time: ${date}</span></strong></p>
          <ul>
            <li class="condition"> Condition: ${condition}</li>
            <li class="temp">Temp: ${(high + low) / 2}</li>
          </ul>
        </div>
      `;
      list.append(currItem);
    });
    el.append(title);
    el.append(list);
  };
  /**
   * Displays the current weather for a given location.
   * @param {Object} data - The object of returned weather data.
   * @param {Object} el - The reference to the display DOM element.
   */


  const displayWeather = (currentWeatherData, el) => {
    // DOM insertion points
    const location = el.querySelector('.details>.location');
    const date = el.querySelector('.details>.date');
    const conditions = el.querySelector('.details>.conditions');
    const temperature = el.querySelector('.details>.temp');
    const sunrise = el.querySelector('.details>.sunrise');
    const sunset = el.querySelector('.details>.sunset'); // display the current weather currentWeatherData

    location.innerText = currentWeatherData.location;
    date.innerText = currentWeatherData.date;
    conditions.innerText = currentWeatherData.conditions;
    temperature.innerText = currentWeatherData.temperature;
    sunrise.innerText = currentWeatherData.sunrise;
    sunset.innerText = currentWeatherData.sunset;
  }; // Event listener for retrieving a weather forecast


  document.querySelector('.frm.weather').addEventListener('submit', e => {
    const location = e.target.querySelector('[name=location]').value;
    let weather = new Weather({
      city: location
    });
    weather.getCurrentWeather().then(currentWeather => {
      displayWeather(weather.weatherData, document.querySelector('.weather-display'));
      return weather.getForecast();
    }).then(currentForecast => {
      displayForecast(currentForecast, document.querySelector('.weather-display .forecast'));
    });
    e.preventDefault();
  });
})();