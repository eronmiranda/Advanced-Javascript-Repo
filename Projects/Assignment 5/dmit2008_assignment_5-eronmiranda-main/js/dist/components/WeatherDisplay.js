const WeatherDisplay = props => {
  let {
    weatherData
  } = props;

  const hasWeatherData = () => {
    if (weatherData === undefined || !('location' in weatherData)) {
      return false;
    }

    return true;
  };

  return (
    /*#__PURE__*/
    React.createElement(React.Fragment, null, hasWeatherData() ?
    /*#__PURE__*/
    React.createElement(React.Fragment, null,
    /*#__PURE__*/
    React.createElement("h2", null, "WeatherDisplay"),
    /*#__PURE__*/
    React.createElement("div", {
      className: "details"
    }, "Location: ", weatherData.location),
    /*#__PURE__*/
    React.createElement("div", {
      className: "details"
    }, "Date: ", weatherData.date.toString()),
    /*#__PURE__*/
    React.createElement("div", {
      className: "details"
    }, "Temperature: ", weatherData.temperature, " celsius"),
    /*#__PURE__*/
    React.createElement("div", {
      className: "details"
    }, "Sunrise: ", weatherData.sunrise.toString()),
    /*#__PURE__*/
    React.createElement("div", {
      className: "details"
    }, "Sunset: ", weatherData.sunset.toString())) :
    /*#__PURE__*/
    React.createElement("p", null, "no data to show."))
  );
};

export default WeatherDisplay;