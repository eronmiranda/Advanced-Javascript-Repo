const API_KEY = '52fc99a956494caea7b135022179925e';
const ENDPOINT = 'https://api.openweathermap.org/data/2.5/';

const Stock = function(options){
	this.symbol = "";
	this.stockData = {};

	if(options){
		Object.assign(this,options);
	}
}

Stock.prototype.getStockPrice = function(){
	return fetch(`${ENDPOINT}GLOBAL_QUOTE&symbol=${this.symbol}&apikey=${API_KEY}`)
	.then((response) => response.json()).then((currentStock) => {
		if (currentStock['Error Message']) {
			throw new Error('There was an error fulfilling your request. Be sure you\'ve entered a valid symbol');
		}
		const { '01. symbol': symbolData, '05. price': priceData, '07. latest trading day': dateData } = currentStock['Global Quote'];
		const symbol = symbolData.toUpperCase();
		const price = `$${Number(priceData).toFixed(2)}`;
		const date = `${dateData} ${dateData.includes(':') ? dateData : ''}`;

		return Object.assign(this.stockData,{
			symbol, price, date
		});
	}).catch((err) => {
		alert(`There was an error: ${err}`);
	});
};

Stock.prototype.getStockFiveDayHistory = function(){
	return fetch(`${ENDPOINT}TIME_SERIES_DAILY&symbol=${this.symbol}&apikey=${API_KEY}`)
	.then((response) => response.json()).then((currentStock) => {
		if (currentStock['Error Message']) {
			throw new Error('There was an error fulfilling your request. Be sure you\'ve entered a valid symbol');
		}
		let fiveDays = Object
		.entries(currentStock['Time Series (Daily)'])
		.slice(0, 5);

		fiveDays = fiveDays.map(day => {
      let {'1. open': open, '2. high': high, '3. low': low, '4. close': close} = day[1];

      return {open, high, low, close, date: day[0]};
		});
		return Object.assign(this.stockData,{
			fiveDays
		});
	}).catch((err) => {
		alert(`There was an error: ${err}`);
	});
};

export { Stock, ENDPOINT, API_KEY };