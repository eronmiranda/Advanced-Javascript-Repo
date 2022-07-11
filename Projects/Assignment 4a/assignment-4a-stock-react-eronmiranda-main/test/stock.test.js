/** BONUS (just this comment.)
Test Coverage Percenage here: 84.6%
*/

import fetchMock from 'fetch-mock-jest';
// TODO: Import the Stock module from the stock.js file.
import { Stock, API_KEY, ENDPOINT } from '../js/src/stock.js';

// Please note that you'll need to remove the "" for all tests
// otherwise nothing will happen.

describe("Testing Stock", ()=> {

  describe('Test Stock Object', ()=> {
    test("initialized with no attributes", ()=> {
      // TODO: assert that the "symbol" attribute of the stock
      // object should be empty
      let stock = new Stock()
      expect(stock.symbol).toEqual('')

      expect(stock.stockData).toEqual({})
      // TODO: assert that the "stockData" attribute of the stock
      // object should be empty
    })

    test("initialized with symbol attribute", ()=> {
      // TODO: test that when stock is initilaized with symbol attribute
      // (can be a random symbol), the object should have that symbol
      let stock = new Stock({"symbol": 'msft'})
      expect(stock.symbol).toEqual('msft')


    })

  })

  describe('Test getStockPrice function', ()=> {
    // NOTE: this makes a network requests, which means you might need
    // to do something before you make the test.
    const SYMBOL = 'googl'
    const CURRENT_PRICE_DATA = {"Global Quote":{
        "01. symbol":"MSFT",
        "02. open":"225.5100",
        "03. high":"227.4500",
        "04. low":"224.4300",
        "05. price":"227.2700",
        "06. volume":"25662587",
        "07. latest trading day":"2020-09-01",
        "08. previous close":"225.5300",
        "09. change":"1.7400",
        "10. change percent":"0.7715%"
      }
    };
    const EXPECTED_DATA = {
      symbol: "MSFT",
      open: "225.5100",
      high: "227.4500",
      low: "224.4300",
      price: "227.2700",
      date: "2020-09-01",
      prevClose: "225.5300",
    }

    test('getStockPrice return price, symbol, and date', ()=> {
      fetchMock.get(`${ENDPOINT}GLOBAL_QUOTE&symbol=${SYMBOL}&apikey=${API_KEY}`,
                    CURRENT_PRICE_DATA)
      let stock = new Stock({symbol: SYMBOL})
      return stock.getStockPrice().then((data)=> {
        // TODO: assert the method resolves an object (since it's a promise)
        expect(data).toEqual(EXPECTED_DATA)
        // TODO: assert that the instance has the required properties.
        expect(stock.stockData).toEqual(EXPECTED_DATA)
      });
    });
  });

  describe('Test getStockFiveDayHistory', () => {
    // NOTE: this makes a network requests, which means you might need
    // to do something before you make the test.
    const SYMBOL = "msft"
    const CURRENT_HISTORY_DATA = {"Meta Data":{"1. Information":"Daily Prices (open, high, low, close) and Volumes","2. Symbol":"msft","3. Last Refreshed":"2020-09-01","4. Output Size":"Compact","5. Time Zone":"US/Eastern"},
      "Time Series (Daily)":{
          "2020-09-01":{"1. open":"225.5100","2. high":"227.4500","3. low":"224.4300","4. close":"227.2700","5. volume":"25662587"},
          "2020-08-31":{"1. open":"227.0000","2. high":"228.7000","3. low":"224.3100","4. close":"225.5300","5. volume":"28774156"},
          "2020-08-28":{"1. open":"228.1800","2. high":"230.6440","3. low":"226.5800","4. close":"228.9100","5. volume":"26292896"},
          "2020-08-27":{"1. open":"222.8900","2. high":"231.1500","3. low":"219.4000","4. close":"226.5800","5. volume":"57602195"},
          "2020-08-26":{"1. open":"217.8800","2. high":"222.0900","3. low":"217.3600","4. close":"221.1500","5. volume":"39600828"}
      }
    }
    const EXPECTED_DATA = [
      {
        open: "225.5100",
        high: "227.4500",
        low: "224.4300",
        close: "227.2700",
        date: "2020-09-01",
      },
      {
        open: "227.0000",
        high: "228.7000",
        low: "224.3100",
        close: "225.5300",
        date: "2020-08-31",
      },
      {
        open: "228.1800",
        high: "230.6440",
        low: "226.5800",
        close: "228.9100",
        date: "2020-08-28",
      },
      {
        open: "222.8900",
        high: "231.1500",
        low: "219.4000",
        close: "226.5800",
        date: "2020-08-27",
      },
      {
        open: "217.8800",
        high: "222.0900",
        low: "217.3600",
        close: "221.1500",
        date: "2020-08-26",
      }
    ]
    test("getStockFiveDayHistory returns array of the previous five days", ()=> {
      // TODO: assert that the method resolves an array.
      fetchMock.get(`${ENDPOINT}TIME_SERIES_DAILY&symbol=${SYMBOL}&apikey=${API_KEY}`,
                    CURRENT_HISTORY_DATA)
      let stock = new Stock({symbol: SYMBOL})
      return stock.getStockFiveDayHistory().then((data)=> {
        expect(data.history).toEqual(EXPECTED_DATA)
      })
      // assert that the instance has the required properties within the "stockData"
    })
  });

});