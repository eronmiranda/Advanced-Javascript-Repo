import { Stock } from './stock.js';

;
(function () {
  "use strict";

  /** API key for signing the request*/

  var API_KEY = 'YOUR-KEY-HERE';
  /** Alpha Vantage REST endpoint */

  var ENDPOINT = 'https://www.alphavantage.co/query?function=';
  var symbol = '';
  /**
   * Display the current price and other information for a stock.
   * @param {HTMLElement} el DOM element parent for the display of the data. Must
   * contain a .symbol, .price, and .date elements.
   * @param {Object} data The returned stock symbol data
   */

  var displayResults = function displayResults(el, data) {
    var _data$GlobalQuote = data['Global Quote'],
        symbol = _data$GlobalQuote['01. symbol'],
        price = _data$GlobalQuote['05. price'],
        date = _data$GlobalQuote['07. latest trading day'];
    var priceElem = el.querySelector('.price');
    priceElem.innerHTML = "$".concat(Number(price).toFixed(2));
    var symbolElem = el.querySelector('.symbol');
    symbolElem.innerHTML = symbol.toUpperCase();
    var dateElem = el.querySelector('.date');
    dateElem.innerHTML = "".concat(date, " ").concat(date.includes(':') ? date : '');
  };
  /**
   * Display the historical (5-day) price and other information for a stock.
   * @param {HTMLElement} el DOM element parent for the display of the data.
   * @param {Object} data The returned stock symbol data
   */


  var displayHistoricalData = function displayHistoricalData(el, data) {
    var fiveDays = data.map(function (day) {
      var _day$ = day[1],
          open = _day$['1. open'],
          high = _day$['2. high'],
          low = _day$['3. low'],
          close = _day$['4. close'];
      return {
        open: open,
        high: high,
        low: low,
        close: close,
        date: day[0]
      };
    });
    var tableData = '';
    fiveDays.map(function (day) {
      tableData += "\n      <tr>\n        <td scope=\"col\">".concat(day.date, "</td>\n        <td scope=\"col\">").concat(day.open, "</td>\n        <td scope=\"col\">").concat(day.high, "</td>\n        <td scope=\"col\">").concat(day.low, "</td>\n        <td scope=\"col\">").concat(day.close, "</td>\n      </tr>\n    ");
    });
    var fullTable = "<table class=\"table\">\n    <thead>\n      <tr>\n        <th scope=\"col\">date</th>\n        <th scope=\"col\">open</th>\n        <th scope=\"col\">high</th>\n        <th scope=\"col\">low</th>\n        <th scope=\"col\">close</th>\n      </tr>\n    </thead>\n    <tbody>\n    ".concat(tableData, "\n    </tbody>\n  </table>\n  ");
    el.innerHTML = fullTable;
  };
  /**
   * Handle symbol form submit to fetch the desired symbol information.
   * @param {Event} evt Event object for this listener function
   */


  var fetchCurrentPrice = function fetchCurrentPrice(evt) {
    evt.preventDefault(); // get the symbol

    symbol = evt.target.elements.symbol.value; //let stock = new Stock({symbol: symbol});

    Stock.getStock(); // stock.getStockPrice()
    //   .then((currentStock) => {
    //     displayResults(document.querySelector('.stock-display'), stock.stockData);
    //   });
    // fetch(`${ENDPOINT}GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // log and export all data
    //     if (data['Error Message']) { // BONUS
    //       throw new Error('There was an error fulfilling your request. Be sure you\'ve entered a valid symbol');
    //     }
    //     displayResults(document.querySelector('.stock-display'), data);
    //     displayCurrentPriceChart(data);
    //   })
    //   .catch((err) => { // BONUS
    //     alert(`There was an error: ${err}`);
    //   });
  };
  /**
   * Handle view history click for the currently viewed stock.
   * @param {Event} evt Event object for this listener function
   */


  var fetchHistory = function fetchHistory(evt) {
    // TODO: error check for currentSymbol value
    fetch("".concat(ENDPOINT, "TIME_SERIES_DAILY&symbol=").concat(symbol, "&apikey=").concat(API_KEY)).then(function (response) {
      return response.json();
    }).then(function (data) {
      // log and export all data
      if (data['Error Message']) {
        throw new Error("There was an error fulfilling your request. Be sure you've entered a valid symbol");
      } // send only the most recent 5 days of data


      var fiveDays = Object.entries(data['Time Series (Daily)']).slice(0, 5);
      displayHistoricalData(document.querySelector('.stock-history-display'), fiveDays);
    })["catch"](function (err) {
      alert("There was an error: ".concat(err));
    });
  };
  /**
   * Displays a bar chart of the data of the day.
   * @param {Object} data The returned stock symbol data
   */


  var displayCurrentPriceChart = function displayCurrentPriceChart(data) {
    var ctx = document.getElementById('stockChart').getContext('2d');
    var _data$GlobalQuote2 = data['Global Quote'],
        symbol = _data$GlobalQuote2['01. symbol'],
        open = _data$GlobalQuote2['02. open'],
        high = _data$GlobalQuote2['03. high'],
        low = _data$GlobalQuote2['04. low'],
        price = _data$GlobalQuote2['05. price'],
        prevClose = _data$GlobalQuote2['08. previous close'];
    // destroy the chart so underlying data isn't shown.
    console.log(ctx.bar);
    var myChart = new Chart(ctx, {
      // eslint-disable-line 
      type: 'bar',
      data: {
        labels: ['open', 'high', 'low', 'price', 'previous close'],
        datasets: [{
          data: [open, high, low, price, prevClose],
          label: "".concat(symbol, " in USD"),
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        }
      }
    });
  }; // add the submit listener


  document.querySelector('.frm.symbol').addEventListener('submit', fetchCurrentPrice); // add the view history listener

  document.querySelector('#view-history-button').addEventListener('click', fetchHistory);
})();
