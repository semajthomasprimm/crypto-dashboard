import { useState, useContext } from "react"
import Select from "react-select"
import Table from "../components/Table"
import Context from "../storage/context"

const currencies = [
  { value: "usd", label: "USD", symbol: "$" },
  { value: "cad", label: "CAD", symbol: "CA$" },
  { value: "gbp", label: "GBP", symbol: "£" },
  
]

const Dashboard = () => {

  const {state, dispatch} = useContext(Context);

  const [query, setQuery] = useState("");

  // Sets USD as default currency
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0])

  const changeCurrency = (selectedCurrency) => setSelectedCurrency(selectedCurrency);

  return (
    <div className={`${state.isDark ? "bg-dark text-light" : "bg-light text-dark"}`}>
      <div className="container">
      <div className="container text-primary">
        <div className="row py-3">
            <div className="row">
              <div className="col-lg-4 my-2">
                <input
                  className="form-control"
                  type="text"
                  placeholder="BTC, DOGE, ETH, etc."
                  onChange={e => setQuery(e.target.value)}
                  value={query}
                />
              </div>

              <div className="col-lg-2 my-2">
                <Select
                  defaultValue={selectedCurrency}
                  options={currencies}
                  onChange={changeCurrency}
                />
              </div>

              <div className="col-lg-6 my-2">
                <button 
                  className={`btn btn-transparent ${state.isDark ? "btn-light" : "btn-dark"} float-lg-end`}
                  onClick={() => dispatch({type: "TOGGLE_DARK_MODE"})}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi ${state.isDark ? "bi-brightness-high-fill" : "bi-brightness-high"}`} viewBox="0 0 16 16">
                    <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
                  </svg>
                </button>
              </div>

            
          </div>
        </div>
      </div>
      <Table currency={selectedCurrency} searchQuery={query} isDark={state.isDark}/>
      <div className="row text-center py-5">
          <p>Created by <a href="https://www.semajprimm.com" target="_blank" rel="noopener noreferrer">Semaj Primm</a>. Data courtesy of <a href="https://www.coingecko.com/en" target="_blank" rel="noopener noreferrer">CoinGecko</a></p>
          <p><a href="https://github.com/semajthomasprimm/crypto-dashboard" target="_blank" rel="noopener noreferrer">Source Code Here</a></p>
          <div>Icons made by <a href="https://www.flaticon.com/authors/eucalyp" target="_blank" rel="noopener noreferrer" title="Eucalyp">Eucalyp</a> from <a href="https://www.flaticon.com/" target="_blank" rel="noopener noreferrer" title="Flaticon">www.flaticon.com</a></div>
      </div>
      </div>
    </div>
  )
}

export default Dashboard
