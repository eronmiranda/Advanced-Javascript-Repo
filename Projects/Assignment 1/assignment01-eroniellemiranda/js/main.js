;

(function () {
  "use strict";

  (function () {
    var API_KEY = 'G2YDK5NNTC1YDFZG';
    var BASE_URL = 'https://www.alphavantage.co/query?';
    var stockTickerForm = document.querySelector('.frm.stock-ticker');
    stockTickerForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var stockSymbol = event.target.querySelector('[name=stock-symbol]').value;
      var dailyUrl = "".concat(BASE_URL, "function=TIME_SERIES_DAILY&symbol=").concat(stockSymbol, "&apikey=").concat(API_KEY);
      fetch(dailyUrl).then(function (response) {
        return response.json();
      }).then(function (dailyStockData) {
        displayStock(dailyStockData, document.querySelector('.stock-display'));
      })["catch"](function (error) {
        if (stockSymbol == "") {
          alert("Please enter stock symbol");
        } else {
          alert("Error while fetching stock symbol information.");
        }
      });
    }); // Displays fetched data from the json object

    /**
    * Displays the current day stock information from the stock symbol, on a given element.
    *
    * @param {Object} dailyStockData - an object, the daily stock data from Alpha Vantage api.
    * @param {Object} stockElement - The reference to the stock element (display).
    */

    var displayStock = function displayStock(dailyStockData, stockElement) {
      var stockSymbol = stockElement.querySelector('.stock-symbol');
      var date = stockElement.querySelector('.date');
      var openPrice = stockElement.querySelector('.open-price');
      var closePrice = stockElement.querySelector('.close-price');
      var currentDate = dailyStockData["Meta Data"]["3. Last Refreshed"];
      stockSymbol.innerText = "".concat(dailyStockData["Meta Data"]["2. Symbol"]).toUpperCase();
      date.innerText = "".concat(new Date(currentDate));
      openPrice.innerText = "".concat(formatter.format(dailyStockData["Time Series (Daily)"]["".concat(currentDate)]["1. open"]));
      closePrice.innerText = "".concat(formatter.format(dailyStockData["Time Series (Daily)"]["".concat(currentDate)]["4. close"]));
    }; // function for formatting currency in US dollars


    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });
  })();
})();
