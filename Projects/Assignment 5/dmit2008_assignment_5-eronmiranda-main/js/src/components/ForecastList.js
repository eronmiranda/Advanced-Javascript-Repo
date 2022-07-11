import React from 'react';

import ForecastItem from './ForecastItem.js';

const ForecastList = (props) => {
  let {weatherData} = props


  const hasWeatherForecast = () => {
    if (weatherData === undefined ||
        !('forecast' in weatherData)) {
      return false;
    }
    return true
  }

  return <div className="forecast">

    { hasWeatherForecast() ?
      <React.Fragment>
        <h2>Forecast</h2>
        <ul>
        {weatherData.forecast.map((forecastDay, index)=> {
          return <ForecastItem key={index} forecastDay={forecastDay} />
        })}
        </ul>
      </React.Fragment>
      :
      <p> No forecast to show</p>
    }
  </div>
}

export default ForecastList;