/** API key for signing the request */
const API_KEY = 'G2YDK5NNTC1YDFZG';
/** Alpha Vantage REST endpoint */
const ENDPOINT = 'https://www.alphavantage.co/query?function=';

/**
 * Display the current price and other information for a stock.
 * @param {HTMLElement} el DOM element parent for the display of the data. Must
 * contain a .symbol, .price, and .date elements.
 * @param {Object} data The returned stock symbol data
 */
const displayResults = (el, data) => {
  const {
    '01. symbol': symbol, '05. price': price, '07. latest trading day': date,
  } = data['Global Quote'];

  el.querySelector('.price').innerHTML = `$${Number(price).toFixed(2)}`;// eslint-disable-line
  el.querySelector('.symbol').innerHTML = symbol.toUpperCase();// eslint-disable-line
  el.querySelector('.date').innerHTML = `${date} ${date.includes(':') ? date : ''}`;// eslint-disable-line
};

/**
 * Display the graph accessing data that contains pricesL open, high, low, current, close, and other information for a stock.
 * @param {Object} data The returned stock symbol data
 */
const displayGraph = (data) => {
  const {
    '01. symbol': symbol, '02. open': open, '03. high': high, '04. low': low, '05. price': price, '08. previous close': previousClose,
  } = data['Global Quote'];

  const ctxL = document.getElementById('lineChart').getContext('2d');
  const gradientFill = ctxL.createLinearGradient(0, 0, 0, 290);
  gradientFill.addColorStop(0, 'rgba(173, 53, 186, 1)');
  gradientFill.addColorStop(1, 'rgba(173, 53, 186, 0.1)');

  Chart.defaults.global.defaultFontColor = 'white';// eslint-disable-line
  const myLineChart = new Chart(ctxL, {// eslint-disable-line
    type: 'line',
    data: {
      labels: ['Open', 'High', 'Low', 'Price', 'Previous Close'],
      datasets: [
        {
          label: `${symbol} in USD`,
          data: [open, high, low, price, previousClose],
          backgroundColor: gradientFill,
          borderColor: [
            '#AD35BA',
          ],
          borderWidth: 2,
          pointBorderColor: '#fff',
          pointBackgroundColor: 'rgba(173, 53, 186, 0.1)',
        },
      ],
    },
    options: {
      responsive: true,
    },
  });
};


/**
 * Handle symbol form submit to fetch the desired symbol information.
 * @param {Event} evt Event object for this listener function
 */
const fetchTickerData = (evt) => {
  evt.preventDefault();
  // get the symbol
  const symbol = evt.target.elements.symbol.value;

  fetch(`${ENDPOINT}GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
    // log and export all data
      if (data['Error Message']) { // BONUS
        throw new Error('There was an error fulfilling your request. Be sure you\'ve entered a valid symbol');
      }
      displayResults(document.querySelector('.stock-display'), data);
      displayGraph(data);
    })
    .catch((err) => { // BONUS
      alert(`There was an error: ${err}`);// eslint-disable-line
    });
};

// add the submit listener
document.querySelector('.frm.symbol').addEventListener('submit', fetchTickerData);
