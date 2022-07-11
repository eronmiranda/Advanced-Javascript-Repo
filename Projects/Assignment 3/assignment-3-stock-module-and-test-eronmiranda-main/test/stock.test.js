/** BONUS (just this comment.)
Test Coverage Percenage here: <insert here>
*/

import fetchMock from 'fetch-mock-jest';
import { Stock, ENDPOINT, API_KEY} from '../js/dist/stock.js';
// TODO: Import the Stock module from the stock.js file.

// Please note that you'll need to remove the "" for all tests
// otherwise nothing will happen.


describe("Testing Stock", ()=> {
let stock;
  describe('Test Stock Object', ()=> {
    test("initialized with no attributes", ()=> {
      // TODO: assert that the "symbol" attribute of the stock
      // object should be empty
      stock = new Stock();

      // TODO: assert that the "stockData" attribute of the stock
      // object should be empty
      expect(stock.symbol).toEqual('');
      expect(weather.stockData).toEqual({});
    })

    test("initialized with symbol attribute", ()=> {
      // TODO: test that when stock is initialized with symbol attribute
      // (can be a random symbol), the object should have that symbol
      stock = new Stock("random");

      expect(stock.symbol).toEqual('random');
    })

  })

  describe('Test getStockPrice function', ()=> {
    // NOTE: this makes a network requests, which means you might need
    // to do something before you make the test.
    const symbol = 'ibm';
    const STOCK_URL = `${ENDPOINT}GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;

    beforeAll(()=>{
      fetchMock.get(STOCK_URL);
      stock = new Stock({symbol: symbol});
    })
    test('getStockPrice return price, symbol, and date', ()=> {
      // TODO: assert the method resolves an object (since it's a promise)
        return stock.getStockPrice()
          .then((currentStock) =>{
            expect(currentStock.toEqual(''));
          })
      // TODO: assert that the instance has the required properties.

    })
  });

  describe('Test getStockFiveDayHistory', () => {
    // NOTE: this makes a network requests, which means you might need
    // to do something before you make the test.

    test("getStockFiveDayHistory returns array of the previous five days", ()=> {
      // TODO: assert that the method resolves an array.

      // assert that the instance has the required properties within the "stockData"
    })
  });

  // BONUS test the chart.js
  describe('BONUS: Chart.js test.', () => {
    test("test that the chart data is correct.", () => {

    });
  });


});