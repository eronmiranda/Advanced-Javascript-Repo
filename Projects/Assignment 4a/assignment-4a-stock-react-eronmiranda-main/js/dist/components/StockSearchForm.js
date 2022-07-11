import { Stock } from '../stock.js';

const StockSearchForm = props => {
  const [stockSymbol, setStockSymbol] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const stockSymbolChangeHandler = event => {
    setErrorMessage("");
    setStockSymbol(event.target.value);
  };

  const onSubmitHandler = event => {
    event.preventDefault();

    if (stockSymbol === "") {
      setErrorState("Please enter a stock symbol");
      return;
    }

    let stock = new Stock({
      symbol: stockSymbol
    });
    stock.getStockPrice().then(currentStock => {
      //console.log(currentStock);
      return stock.getStockFiveDayHistory();
    }).then(currentStockAndHistory => {
      console.log(currentStockAndHistory);
      props.setStockData(currentStockAndHistory);
    }).catch(error => {
      console.log(error);
      setErrorState("Invalid symbol. Please enter a new stock symbol.");
    });
  };

  const setErrorState = message => {
    props.setStockData({});
    setErrorMessage(message);
  };

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Stock Search"), /*#__PURE__*/React.createElement("form", {
    onSubmit: onSubmitHandler,
    className: "frm symbol"
  }, /*#__PURE__*/React.createElement("div", {
    className: "md-form"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "symbol",
    className: "form-control",
    value: stockSymbol,
    name: "symbol",
    onChange: stockSymbolChangeHandler
  }), /*#__PURE__*/React.createElement("label", {
    for: "symbol"
  }, "Ticker Symbol")), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-success"
  }, "View"), errorMessage !== "" && /*#__PURE__*/React.createElement("div", {
    class: "alert alert-danger",
    role: "alert"
  }, errorMessage)));
};

export default StockSearchForm;