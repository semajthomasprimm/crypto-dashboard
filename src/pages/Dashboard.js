import { useState, useContext } from "react"
import Select from "react-select"
import Table from "../components/Table"
import ThemeToggle from "../components/ThemeToggle"
import SearchBar from "../components/SearchBar";
import Context from "../storage/context"
import currencies from '../data/currencies.json';

const Dashboard = () => {

  const {state, dispatch} = useContext(Context);

  const [query, setQuery] = useState("");

  // Sets USD as default currency
  const [selectedCurrency, setSelectedCurrency] = useState(currencies.length > 0 && currencies[0]);

  const changeCurrency = (selectedCurrency) => setSelectedCurrency(selectedCurrency);

  return (
    <div className={`min-vh-100 ${state.isDark ? "bg-dark text-light" : "bg-light text-dark"}`}>
      <div className="container">
        <div className="row py-3">
            <SearchBar query={query} setQuery={setQuery}/>
            <Select 
              defaultValue={selectedCurrency} 
              options={currencies} 
              onChange={changeCurrency}
              className="col-lg-2 my-2 text-primary"
            />
            <ThemeToggle state={state} dispatch={dispatch}/>
        </div>
        <Table currency={selectedCurrency} searchQuery={query} isDark={state.isDark}/>
        <div className="row text-center py-5">
            <p>Created by <a href="https://www.semajprimm.com" target="_blank" rel="noopener noreferrer">Semaj Primm</a>. Data courtesy of <a href="https://www.coingecko.com/en" target="_blank" rel="noopener noreferrer">CoinGecko</a></p>
            <p><a href="https://github.com/semajthomasprimm/crypto-dashboard" target="_blank" rel="noopener noreferrer">Source Code Here</a></p>
            <div>Icons made by <a href="https://www.flaticon.com/authors/eucalyp" target="_blank" rel="noopener noreferrer" title="Eucalyp">Eucalyp</a> from <a href="https://www.flaticon.com/" target="_blank" rel="noopener noreferrer" title="Flaticon">www.flaticon.com</a></div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard