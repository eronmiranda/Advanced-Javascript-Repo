import StockSearchForm from './components/StockSearchForm.js';
import StockPriceDisplay from './components/StockPriceDisplay.js';
import StockPriceHistoryList from './components/StockPriceHistoryList.js';

const App = () => {
  const [stockData, setStockData] = React.useState({}); // React.useEffect(() => {
  //   console.log("stockData has changed. (app comp");
  //   console.log(stockData);
  // }, [stockData]);

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("nav", {
    className: "navbar navbar-expand-lg navbar-dark primary-color"
  }, /*#__PURE__*/React.createElement("a", {
    className: "navbar-brand",
    href: "#"
  }, "Stock Application")), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement(StockSearchForm, {
    setStockData: setStockData
  })), /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement("section", {
    class: "stock-display"
  }, /*#__PURE__*/React.createElement(StockPriceDisplay, {
    stockData: stockData
  })))), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement(StockPriceHistoryList, {
    stockData: stockData
  })))));
};

let reactContainer = document.querySelector("#react-container");
ReactDOM.render( /*#__PURE__*/React.createElement(App, null), reactContainer);