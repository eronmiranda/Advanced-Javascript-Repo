import React from 'react';

const ForecastItem = (props) => {
  let {key, forecastDay} = props

  return <li key={key}>
    <div className="forecast-detail">
      <p><strong><span className="time">Time: {forecastDay.date}</span></strong></p>
      <ul>
        <li className="condition"> Condition: {forecastDay.condition}</li>
        <li className="temp">Temp: {((forecastDay.high + forecastDay.low) / 2)}</li>
      </ul>
    </div>
  </li>
}

export default ForecastItem;
