import { Stock } from './stock.js';

/** API key for signing the request */
const API_KEY = 'QCGW89A222NC18JA';
/** Alpha Vantage REST endpoint */
const ENDPOINT = 'https://www.alphavantage.co/query?function=';

let symbol = '';

/**
 * Display the current price and other information for a stock.
 * @param {HTMLElement} el DOM element parent for the display of the data. Must
 * contain a .symbol, .price, and .date elements.
 * @param {Object} data The returned stock symbol data
 */
const displayResults = (el, data) => {
  const priceElem = el.querySelector('.price');
  priceElem.innerHTML = `$${Number(data.price).toFixed(2)}`;
  const symbolElem = el.querySelector('.symbol');
  symbolElem.innerHTML = data.symbol.toUpperCase();
  const dateElem = el.querySelector('.date');
  dateElem.innerHTML = `${data.date} ${data.date.includes(':') ? date : ''}`;
};


/**
 * Display the historical (5-day) price and other information for a stock.
 * @param {HTMLElement} el DOM element parent for the display of the data.
 * @param {Object} data The returned stock symbol data
 */
const displayHistoricalData = (el, data) => {
  let tableData = '';
  data.map((day)=> {
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
const fetchCurrentPrice = (stock) => {
  stock.getStockPrice()
    .then((data)=> {
      console.log(data)
      displayResults(document.querySelector('.stock-display'), data);
      displayCurrentPriceChart(data)
    });
};

/**
 * Handle view history click for the currently viewed stock.
 * @param {Event} evt Event object for this listener function
 */
const fetchHistory = (stock) => {

    stock.getStockFiveDayHistory()
      .then((data)=> {
        console.log(data)
        displayHistoricalData(document.querySelector('.stock-history-display'), data.history);
        displayHistoryPriceChart(data.history)
      });
};

/**
 * Displays a bar chart of the data of the day.
 * @param {Object} data The returned stock symbol data
 */
const displayCurrentPriceChart = (data) => {
  const ctx = document.getElementById('stockChart').getContext('2d');
  // destroy the chart so underlying data isn't shown.
  console.log(data);
  const myChart = new Chart(ctx, {  // eslint-disable-line 
    type: 'bar',
    data: {
      labels: ['open', 'high', 'low', 'price', 'previous close'],
      datasets: [{
        data: [data.open, data.high, data.low, data.price, data.prevClose],
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


/**
 * Displays a bar chart of the history data **BONUS**
 * @param {Object} data The returned stock symbol history data
 */
const displayHistoryPriceChart = (data) => {
  const ctx = document.getElementById('stockHistoryChart').getContext('2d');
  // destroy the chart so underlying data isn't shown.
  console.log(data);
  const myChart = new Chart(ctx, {  // eslint-disable-line 
    type: 'bar',
    data: {
      labels: data.map((day)=> day.date),
      datasets: [{
        data: data.map((day)=> day.close),
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
document.querySelector('.frm.symbol')
  .addEventListener('submit', (event)=>{
    event.preventDefault();
    symbol = event.target.elements.symbol.value;
    fetchCurrentPrice(new Stock({symbol: symbol}));
  });

// add the view history listener
document.querySelector('#view-history-button')
  .addEventListener('click', (event)=>{
    fetchHistory(new Stock({symbol: symbol}));
  });
