;

(function () {
  "use strict";

  /** API key for signing the request */
  var API_KEY = 'YOUR_API_HERE';
  /** Alpha Vantage REST endpoint */

  var ENDPOINT = 'https://www.alphavantage.co/query?function=';
  /**
   * Display the current price and other information for a stock.
   * @param {HTMLElement} el DOM element parent for the display of the data. Must
   * contain a .symbol, .price, and .date elements.
   * @param {Object} data The returned stock symbol data
   */

  var displayGraph = function displayGraph(data) {
    var _data$GlobalQuote = data['Global Quote'],
        symbol = _data$GlobalQuote['01. symbol'],
        open = _data$GlobalQuote['02. open'],
        high = _data$GlobalQuote['03. high'],
        low = _data$GlobalQuote['04. low'],
        price = _data$GlobalQuote['05. price'],
        previousClose = _data$GlobalQuote['08. previous close'];
    var ctxL = document.getElementById('lineChart').getContext('2d');
    var gradientFill = ctxL.createLinearGradient(0, 0, 0, 290);
    gradientFill.addColorStop(0, 'rgba(173, 53, 186, 1)');
    gradientFill.addColorStop(1, 'rgba(173, 53, 186, 0.1)');
    Chart.defaults.global.defaultFontColor = 'white';
    var myLineChart = new Chart(ctxL, {
      // eslint-disable-line
      type: 'line',
      data: {
        labels: ['Open', 'High', 'Low', 'Price', 'Previous Close'],
        datasets: [{
          label: "".concat(symbol, " in USD"),
          data: [open, high, low, price, previousClose],
          backgroundColor: gradientFill,
          borderColor: ['#AD35BA'],
          borderWidth: 2,
          pointBorderColor: '#fff',
          pointBackgroundColor: 'rgba(173, 53, 186, 0.1)'
        }]
      },
      options: {
        responsive: true
      }
    });
  };

  var displayResults = function displayResults(el, data) {
    var _data$GlobalQuote2 = data['Global Quote'],
        symbol = _data$GlobalQuote2['01. symbol'],
        price = _data$GlobalQuote2['05. price'],
        date = _data$GlobalQuote2['07. latest trading day'];
    el.querySelector('.price').innerHTML = "$".concat(Number(price).toFixed(2)); // eslint-disable-line

    el.querySelector('.symbol').innerHTML = symbol.toUpperCase(); // eslint-disable-line

    el.querySelector('.date').innerHTML = "".concat(date, " ").concat(date.includes(':') ? date : ''); // eslint-disable-line
  };
  /**
   * Handle symbol form submit to fetch the desired symbol information.
   * @param {Event} evt Event object for this listener function
   */


  var fetchTickerData = function fetchTickerData(evt) {
    evt.preventDefault(); // get the symbol

    var symbol = evt.target.elements.symbol.value;
    fetch("".concat(ENDPOINT, "GLOBAL_QUOTE&symbol=").concat(symbol, "&apikey=").concat(API_KEY)).then(function (response) {
      return response.json();
    }).then(function (data) {
      // log and export all data
      if (data['Error Message']) {
        // BONUS
        throw new Error('There was an error fulfilling your request. Be sure you\'ve entered a valid symbol');
      }

      displayResults(document.querySelector('.stock-display'), data);
      displayGraph(data);
    })["catch"](function (err) {
      // BONUS
      alert("There was an error: ".concat(err)); // eslint-disable-line
    });
  }; // add the submit listener


  document.querySelector('.frm.symbol').addEventListener('submit', fetchTickerData);
})();
