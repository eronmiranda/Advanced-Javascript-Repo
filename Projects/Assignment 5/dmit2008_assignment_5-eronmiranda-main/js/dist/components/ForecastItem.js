const ForecastItem = props => {
  let {
    key,
    forecastDay
  } = props;
  return (
    /*#__PURE__*/
    React.createElement("li", {
      key: key
    },
    /*#__PURE__*/
    React.createElement("div", {
      className: "forecast-detail"
    },
    /*#__PURE__*/
    React.createElement("p", null,
    /*#__PURE__*/
    React.createElement("strong", null,
    /*#__PURE__*/
    React.createElement("span", {
      className: "time"
    }, "Time: ", forecastDay.date))),
    /*#__PURE__*/
    React.createElement("ul", null,
    /*#__PURE__*/
    React.createElement("li", {
      className: "condition"
    }, " Condition: ", forecastDay.condition),
    /*#__PURE__*/
    React.createElement("li", {
      className: "temp"
    }, "Temp: ", (forecastDay.high + forecastDay.low) / 2))))
  );
};

export default ForecastItem;