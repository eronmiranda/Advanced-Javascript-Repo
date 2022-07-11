import WeatherSearchForm from './components/WeatherSearchForm.js';
import WeatherDisplay from './components/WeatherDisplay.js';
import ForecastList from './components/ForecastList.js';

const App = () => {
  const [weatherData, setWeatherData] = React.useState({});
  React.useEffect(() => {
    console.log("weatherData changed in the app component.");
    console.log(weatherData);
  }, [weatherData]);
  return (
    /*#__PURE__*/
    React.createElement("div", null,
    /*#__PURE__*/
    React.createElement("nav", {
      className: "navbar navbar-expand-lg navbar-dark primary-color"
    },
    /*#__PURE__*/
    React.createElement("a", {
      className: "navbar-brand",
      href: "#"
    }, "Weather App")),
    /*#__PURE__*/
    React.createElement("div", {
      className: "container"
    },
    /*#__PURE__*/
    React.createElement(WeatherSearchForm, {
      setWeatherData: setWeatherData
    }),
    /*#__PURE__*/
    React.createElement("section", {
      className: "weather-display"
    },
    /*#__PURE__*/
    React.createElement(WeatherDisplay, {
      weatherData: weatherData
    }),
    /*#__PURE__*/
    React.createElement(ForecastList, {
      weatherData: weatherData
    }))))
  );
};

let reactContainer = document.querySelector("#react-container");
ReactDOM.render(
/*#__PURE__*/
React.createElement(App, null), reactContainer);