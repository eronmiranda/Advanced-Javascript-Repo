import ForecastItem from './ForecastItem.js';

const ForecastList = props => {
  let {
    weatherData
  } = props;

  const hasWeatherForecast = () => {
    if (weatherData === undefined || !('forecast' in weatherData)) {
      return false;
    }

    return true;
  };

  return (
    /*#__PURE__*/
    React.createElement("div", {
      className: "forecast"
    }, hasWeatherForecast() ?
    /*#__PURE__*/
    React.createElement(React.Fragment, null,
    /*#__PURE__*/
    React.createElement("h2", null, "Forecast"),
    /*#__PURE__*/
    React.createElement("ul", null, weatherData.forecast.map((forecastDay, index) => {
      return (
        /*#__PURE__*/
        React.createElement(ForecastItem, {
          key: index,
          forecastDay: forecastDay
        })
      );
    }))) :
    /*#__PURE__*/
    React.createElement("p", null, " No forecast to show"))
  );
};

export default ForecastList;