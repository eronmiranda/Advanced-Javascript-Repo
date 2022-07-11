import StockSearchForm from './components/StockSearchForm.js';
import StockPriceDisplay from './components/StockPriceDisplay.js';
import StockPriceHistoryList from './components/StockPriceHistoryList.js';

const App = () =>{
  const [stockData, setStockData] = React.useState({});

  // React.useEffect(() => {
  //   console.log("stockData has changed. (app comp");
  //   console.log(stockData);
  // }, [stockData]);

  return <div>
    <nav className="navbar navbar-expand-lg navbar-dark primary-color">
      <a className="navbar-brand" href="#">Stock Application</a>
    </nav>
    <div className="container">
      <div className="row">
        <div className="col">
          <StockSearchForm
            setStockData = {setStockData}/>
        </div>
        <div className="col">
          <section class="stock-display">
            <StockPriceDisplay
              stockData = {stockData}/>
          </section>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <StockPriceHistoryList
            stockData = {stockData}/>
        </div>
      </div>
    </div>
  </div>
}

let reactContainer = document.querySelector("#react-container");
ReactDOM.render(<App/>,reactContainer);
