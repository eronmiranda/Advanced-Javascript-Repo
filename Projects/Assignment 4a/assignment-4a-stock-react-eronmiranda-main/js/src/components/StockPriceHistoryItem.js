const StockPriceHistoryItem = (props) => {
  return <tr key={props.key}>
        <td scope="col">{props.stockHistoryDay.date}</td>
        <td scope="col">${props.stockHistoryDay.open}</td>
        <td scope="col">${props.stockHistoryDay.high}</td>
        <td scope="col">${props.stockHistoryDay.low}</td>
        <td scope="col">${props.stockHistoryDay.close}</td>
      </tr>
}

export default StockPriceHistoryItem;