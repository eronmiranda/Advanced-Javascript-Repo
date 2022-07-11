const StockPriceDisplay = (props) => {
  let{stockData} = props;

  return <div>
        <h1>Stock Viewer</h1>
        <div 
          className="details">
            symbol: <span className="symbol">{stockData.symbol}</span> <span className="date">{stockData.date}</span>
        </div>
        <div 
          className="details">price: <span className="price">${stockData.price}</span>
        </div>
        <button 
          id="view-history-button" 
          className="btn btn-success">View History</button>
      </div>
}


export default StockPriceDisplay;