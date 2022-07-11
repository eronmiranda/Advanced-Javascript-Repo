const StockPriceHistoryItem = props => {
  return /*#__PURE__*/React.createElement("tr", {
    key: props.key
  }, /*#__PURE__*/React.createElement("td", {
    scope: "col"
  }, props.stockHistoryDay.date), /*#__PURE__*/React.createElement("td", {
    scope: "col"
  }, "$", props.stockHistoryDay.open), /*#__PURE__*/React.createElement("td", {
    scope: "col"
  }, "$", props.stockHistoryDay.high), /*#__PURE__*/React.createElement("td", {
    scope: "col"
  }, "$", props.stockHistoryDay.low), /*#__PURE__*/React.createElement("td", {
    scope: "col"
  }, "$", props.stockHistoryDay.close));
};

export default StockPriceHistoryItem;