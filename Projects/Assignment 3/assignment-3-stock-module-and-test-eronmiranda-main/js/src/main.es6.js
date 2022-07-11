import {Stock} from './stock.js';


/** API key for signing the request*/
const API_KEY = 'YOUR-KEY-HERE';
/** Alpha Vantage REST endpoint */
const ENDPOINT = 'https://www.alphavantage.co/query?function=';

let symbol = ''

/**
 * Display the current price and other information for a stock.
 * @param {HTMLElement} el DOM element parent for the display of the data. Must
 * contain a .symbol, .price, and .date elements.
 * @param {Object} data The returned stock symbol data
 */
const displayResults = (el, data) => {
  const priceElem = el.querySelector('.price');
  priceElem.innerHTML = data.price;
  const symbolElem = el.querySelector('.symbol');
  symbolElem.innerHTML = data.symbol;
  const dateElem = el.querySelector('.date');
  dateElem.innerHTML = data.date;
};


/**
 * Display the historical (5-day) price and other information for a stock.
 * @param {HTMLElement} el DOM element parent for the display of the data.
 * @param {Object} data The returned stock symbol data
 */
const displayHistoricalData = (el, data) => {
  let fiveDays = data.map(day => {
      let {'1. open': open, '2. high': high, '3. low': low, '4. close': close} = day[1];

      return {open, high, low, close, date: day[0]};
  });

  let tableData = '';
  fiveDays.map((day)=> {
    tableData += `
      <tr>
        <td scope="col">${day.date}</td>
        <td scope="col">${day.open}</td>
        <td scope="col">${day.high}</td>
        <td scope="col">${day.low}</td>
        <td scope="col">${day.close}</td>
      </tr>
    `
  })

  const fullTable = `<table class="table">
    <thead>
      <tr>
        <th scope="col">date</th>
        <th scope="col">open</th>
        <th scope="col">high</th>
        <th scope="col">low</th>
        <th scope="col">close</th>
      </tr>
    </thead>
    <tbody>
    ${tableData}
    </tbody>
  </table>
  `;
  el.innerHTML = fullTable;
}

/**
 * Handle symbol form submit to fetch the desired symbol information.
 * @param {Event} evt Event object for this listener function
 */
const fetchCurrentPrice = (evt) => {
  evt.preventDefault();
  // get the symbol
  symbol = evt.target.elements.symbol.value;
  let stock = new Stock({symbol: symbol});
  stock.getStockPrice()
    .then((currentStock) => {
      displayResults(document.querySelector('.stock-display'), stock.stockData);
    });

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
const fetchHistory = (evt) => {
    // TODO: error check for currentSymbol value
    fetch(`${ENDPOINT}TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`).then(response => {
        return response.json();
    }).then(data => {
        // log and export all data
        if (data['Error Message']) {
            throw new Error(`There was an error fulfilling your request. Be sure you've entered a valid symbol`);
        }
        // send only the most recent 5 days of data
        let fiveDays = Object
            .entries(data['Time Series (Daily)'])
            .slice(0, 5);
        displayHistoricalData(document.querySelector('.stock-history-display'), fiveDays);
    }).catch(err => {
        alert(`There was an error: ${err}`);
    });
};

/**
 * Displays a bar chart of the data of the day.
 * @param {Object} data The returned stock symbol data
 */
const displayCurrentPriceChart = (data) => {
  const ctx = document.getElementById('stockChart').getContext('2d');
  const {
    '01. symbol': symbol,
    '02. open': open,
    '03. high': high,
    '04. low': low,
    '05. price': price,
    '08. previous close': prevClose,
  } = data['Global Quote']; 
  // destroy the chart so underlying data isn't shown.
  console.log(ctx.bar);
  const myChart = new Chart(ctx, {  // eslint-disable-line 
    type: 'bar',
    data: {
      labels: ['open', 'high', 'low', 'price', 'previous close'],
      datasets: [{
        data: [open, high, low, price, prevClose],
        label: `${symbol} in USD`,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
      ],
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false,
          },
        },
        ],
      },
    },
  });
};


// add the submit listener
document.querySelector('.frm.symbol').addEventListener('submit', fetchCurrentPrice);

// add the view history listener
document.querySelector('#view-history-button').addEventListener('click', fetchHistory);
