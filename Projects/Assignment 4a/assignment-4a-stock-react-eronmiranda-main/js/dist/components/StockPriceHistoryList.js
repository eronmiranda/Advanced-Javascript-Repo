import StockPriceHistoryItem from './StockPriceHistoryItem.js';

const StockPriceHistoryList = props => {
  let {
    stockData
  } = props;

  const hasStockPriceHistory = () => {
    if (stockData === undefined || !('history' in stockData)) {
      return false;
    }

    return true;
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "stock-history-display"
  }, /*#__PURE__*/React.createElement("h1", null, "Stock History"), hasStockPriceHistory() && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("table", {
    class: "table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    scope: "col"
  }, "date"), /*#__PURE__*/React.createElement("th", {
    scope: "col"
  }, "open"), /*#__PURE__*/React.createElement("th", {
    scope: "col"
  }, "high"), /*#__PURE__*/React.createElement("th", {
    scope: "col"
  }, "low"), /*#__PURE__*/React.createElement("th", {
    scope: "col"
  }, "close"))), /*#__PURE__*/React.createElement("tbody", null, stockData.history.map((stockHistoryDay, index) => {
    return /*#__PURE__*/React.createElement(StockPriceHistoryItem, {
      key: index,
      stockHistoryDay: stockHistoryDay
    });
  })))));
};

export default StockPriceHistoryList;