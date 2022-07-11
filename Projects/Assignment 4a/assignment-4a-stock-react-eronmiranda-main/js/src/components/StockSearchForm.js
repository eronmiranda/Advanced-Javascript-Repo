import { Stock } from '../stock.js';

const StockSearchForm = (props) => {
  const [stockSymbol, setStockSymbol]= React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const stockSymbolChangeHandler = (event) => {
    setErrorMessage("");
    setStockSymbol(event.target.value);
  }
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if(stockSymbol === "") {
      setErrorState("Please enter a stock symbol");
      return;
    }
    let stock = new Stock({symbol: stockSymbol});
    stock.getStockPrice()
      .then((currentStock) => {
        //console.log(currentStock);
        return stock.getStockFiveDayHistory();
      }).then((currentStockAndHistory) => {
        console.log(currentStockAndHistory);
        props.setStockData(currentStockAndHistory);
      }).catch((error) => {
        console.log(error);
        setErrorState("Invalid symbol. Please enter a new stock symbol.")
      })
  }

  const setErrorState = (message) => {
    props.setStockData({});
    setErrorMessage(message);
  }

  return <div>
    <h1>Stock Search</h1>
    <form 
      onSubmit={onSubmitHandler}
      className="frm symbol">
      <div className="md-form">
        <input 
          type="text" 
          id="symbol" 
          className="form-control"
          value={stockSymbol} 
          name="symbol"
          onChange={stockSymbolChangeHandler}/>
        <label for="symbol">Ticker Symbol</label>
      </div>

      <button 
        type="submit" 
        className="btn btn-success">View</button>
      { (errorMessage !== "") &&
        <div class="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      }
    </form>
  </div>
}

export default StockSearchForm;