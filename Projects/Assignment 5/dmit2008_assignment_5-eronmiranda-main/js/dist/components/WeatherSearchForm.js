import { Weather } from '../weather.js';

const WeatherSearchForm = props => {
  const [location, setLocation] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const locationChangeHandler = event => {
    setErrorMessage("");
    setLocation(event.target.value);
  };

  const onSubmitHandler = event => {
    event.preventDefault();

    if (location === "") {
      setErrorState("please enter a city.");
      return;
    }

    let weather = new Weather({
      city: location
    });
    weather.getCurrentWeather().then(currentWeather => {
      // props.setWeatherData(currentWeather);
      return weather.getForecast();
    }).then(currentWeatherAndForecast => {
      props.setWeatherData(currentWeatherAndForecast);
    }).catch(error => {
      // we're not going to have any weather.
      console.log(error);
      setErrorState("Invalid city please enter a new one.");
    });
  };

  const setErrorState = message => {
    props.setWeatherData({});
    setErrorMessage(message);
  };

  return (
    /*#__PURE__*/
    React.createElement("div", null,
    /*#__PURE__*/
    React.createElement("h2", null, "Search Weather for a City"),
    /*#__PURE__*/
    React.createElement("form", {
      onSubmit: onSubmitHandler,
      className: "frm weather md-form"
    },
    /*#__PURE__*/
    React.createElement("label", {
      for: "location"
    }, "Location"),
    /*#__PURE__*/
    React.createElement("input", {
      type: "text",
      id: "location",
      name: "location",
      className: "form-control",
      value: location,
      onChange: locationChangeHandler
    }),
    /*#__PURE__*/
    React.createElement("button", {
      className: "btn btn-primary",
      type: "submit"
    }, "Get Weather"), errorMessage !== "" &&
    /*#__PURE__*/
    React.createElement("div", {
      class: "alert alert-danger",
      role: "alert"
    }, errorMessage)))
  );
};

export default WeatherSearchForm;