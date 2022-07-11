(() => {
  const API_KEY = 'G2YDK5NNTC1YDFZG';
  const BASE_URL = 'https://www.alphavantage.co/query?';
  const stockTickerForm = document.querySelector('.frm.stock-ticker');


  stockTickerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const stockSymbol = event.target.querySelector('[name=stock-symbol]').value;
    const dailyUrl = `${BASE_URL}function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=${API_KEY}`;

    fetch(dailyUrl)
      .then((response) => response.json())
      .then((dailyStockData) => {
        displayStock(dailyStockData, document.querySelector('.stock-display'));
      }).catch((error => {
        if (stockSymbol == "") {
          alert("Please enter stock symbol");
        }
        else {
          alert("Error while fetching stock symbol information.");
        }

      }));
  });

  // Displays fetched data from the json object
  /**
 * Displays the current day stock information from the stock symbol, on a given element.
 *
 * @param {Object} dailyStockData - an object, the daily stock data from Alpha Vantage api.
 * @param {Object} stockElement - The reference to the stock element (display).
 */
  const displayStock = (dailyStockData, stockElement) => {
    const stockSymbol = stockElement.querySelector('.stock-symbol');
    const date = stockElement.querySelector('.date');
    const openPrice = stockElement.querySelector('.open-price');
    const closePrice = stockElement.querySelector('.close-price');
    let currentDate = dailyStockData["Meta Data"]["3. Last Refreshed"];

    stockSymbol.innerText = `${dailyStockData["Meta Data"]["2. Symbol"]}`.toUpperCase();
    date.innerText = `${new Date(currentDate)}`;
    openPrice.innerText = `${formatter.format(dailyStockData["Time Series (Daily)"][`${currentDate}`]["1. open"])}`;
    closePrice.innerText = `${formatter.format(dailyStockData["Time Series (Daily)"][`${currentDate}`]["4. close"])}`;
  };

  // function for formatting currency in US dollars
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })
})();