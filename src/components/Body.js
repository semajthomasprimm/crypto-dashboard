import Select from "react-select"
import { useState } from 'react';
import Table from "./Table";

const currencies = [
  { value: "usd", label: "USD", symbol: "$" },
  { value: "cad", label: "CAD", symbol: "CA$" },
  { value: "gbp", label: "GBP", symbol: "£"},
]

const Body = () => {

  // Sets USD as default currency
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  
  const changeCurrency = (selectedCurrency) => setSelectedCurrency(selectedCurrency);

  //console.log(`SELECTED CURRENCY: ${selectedCurrency.value} ${selectedCurrency.label} ${selectedCurrency.symbol}`);
  /**3 cases
   * Case 1: number has no decimal numbers, add .00
   * Case 2: number has only 1 decimal number, add 0 to .n
   * Case 3: number has more than 1 decimal number, don't alter
   */

  return (
    <div>
      <div>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"/>
          <span>
            <i className="fas fa-search"></i>
          </span>
          <input type="text" placeholder="BTC, DOGE, etc." />
        </div>
        <div>
          <Select defaultValue={selectedCurrency} options={currencies} onChange={changeCurrency}/>
        </div>
      <div>
        <Table currency={selectedCurrency}/>
      </div>
    </div>
  )
}

export default Body
