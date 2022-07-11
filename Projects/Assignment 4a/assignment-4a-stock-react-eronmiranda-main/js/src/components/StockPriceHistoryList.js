import StockPriceHistoryItem from './StockPriceHistoryItem.js';

const StockPriceHistoryList = (props) => {
  let{stockData} = props;

  const hasStockPriceHistory = () => {
    if (stockData=== undefined ||
        !('history' in stockData)) {
      return false;
    }
    return true;
  }
  
  return <div className="stock-history-display">
      <h1>Stock History</h1>
      {hasStockPriceHistory() &&
        <React.Fragment>
          <table class="table">
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
              {stockData.history.map((stockHistoryDay, index) => {
                return <StockPriceHistoryItem
                  key={index}
                  stockHistoryDay={stockHistoryDay}/>
              })}
            </tbody>
          </table>
        </React.Fragment>}
      </div>
}


export default StockPriceHistoryList;