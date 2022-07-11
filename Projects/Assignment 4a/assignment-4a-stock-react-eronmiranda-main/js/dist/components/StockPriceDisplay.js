const StockPriceDisplay = props => {
  let {
    stockData
  } = props;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Stock Viewer"), /*#__PURE__*/React.createElement("div", {
    className: "details"
  }, "symbol: ", /*#__PURE__*/React.createElement("span", {
    className: "symbol"
  }, stockData.symbol), " ", /*#__PURE__*/React.createElement("span", {
    className: "date"
  }, stockData.date)), /*#__PURE__*/React.createElement("div", {
    className: "details"
  }, "price: ", /*#__PURE__*/React.createElement("span", {
    className: "price"
  }, "$", stockData.price)), /*#__PURE__*/React.createElement("button", {
    id: "view-history-button",
    className: "btn btn-success"
  }, "View History"));
};

export default StockPriceDisplay;