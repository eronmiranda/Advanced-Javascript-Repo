import React from 'react';

const WeatherDisplay = (props) => {
  let {weatherData} = props

  const hasWeatherData = () => {
    if (weatherData === undefined ||
        !('location' in weatherData)) {
      return false;
    }
    return true
  }

  return <React.Fragment>
    { hasWeatherData() ?
      <React.Fragment>
        <h2>WeatherDisplay</h2>
        <div className="details">Location: {weatherData.location}</div>
        <div className="details">Date: {weatherData.date.toString()}</div>
        <div className="details">Temperature: {weatherData.temperature} celsius</div>
        <div className="details">Sunrise: {weatherData.sunrise.toString()}</div>
        <div className="details">Sunset: {weatherData.sunset.toString()}</div>
      </React.Fragment>
      :
      <p>no data to show.</p>
    }
  </React.Fragment>

}

export default WeatherDisplay;