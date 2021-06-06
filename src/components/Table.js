import useSWR from "swr"
import { fetcher } from "../fetcher"

const Table = (props) => {

    // Returns filtered array
    const getFilteredCryptoData = (cryptos, query) => {
        return (query === "") ? cryptos : cryptos.filter((crypto) => {return crypto.name.toLowerCase().includes(query)});
    }

    // Retrieves selected currency and saves to local variable
    const currency = props.currency;

    // Local variable for storing API data
    let cryptoData = []

    // Uses SWR hook to retrieve data from API
    const { data, error } = useSWR(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.value}&order=market_cap_desc&per_page=100&page=1&sparkline=false`, fetcher)
    
    // Stores boolean value regarding whether data is defined(valid)
    const isDataValid = data !== undefined && error === undefined

    // Clears array
    cryptoData = []

    // Appends retrieved data to local array(cryptoData)
    isDataValid && data.forEach(crypto => cryptoData.push(crypto));

    const filteredCryptoData = isDataValid && getFilteredCryptoData(cryptoData, props.searchQuery);

    // Formats numbers to have .00 and , with more than 3 digits after the decimal point
    const formatFloat = (price) => {
        var x = String(price);
        if(x.split(".").length === 1)
            x += ".00";
        else if(x.split(".").length === 2)
            if(x.split(".")[1].length === 1)
                x += "0";
        
        // format numbers's with more than 3 digits before decimal point
        if(x.split(".")[0].length > 3)
            x = parseInt(x.split(".")[0]).toLocaleString() + "." + x.split(".")[1];
        
        return x;
    }

    // adds K,M,B to large numbers and formats it to 2 decimal places or less
    const formatLargeNumber = (num) =>{
        if(num < 999) return num;
        else if(1000 <= num && num < 1000000) return (num / 1000) + "K";
        else if(1000000 <= num && num < 1000000000) return (num / 1000000).toFixed(2) + "M";
        else if(1000000000 <= num && num < 1000000000000) return (num / 1000000000).toFixed(2) + "B";
        return num;
    }

    return (
        <div>
            <table className={`table table-striped ${props.isDark ? "text-light" : "text-dark"}`}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Rank</th>
                        <th>Price</th>
                        <th>24h Volume</th>
                        <th>Market Cap</th>
                        <th>24h Change</th>
                    </tr>
                </thead>
                <tbody>
                {isDataValid &&
                    filteredCryptoData.map((crypto, index) => {
                        return (
                        <tr key={crypto.id} className={`${props.isDark ? "text-light" : "text-dark"}`}>
                            <td>{crypto.market_cap_rank}</td>
                            <td>
                                <img style={{ display: "inline-block", marginRight: "10px"}} src={crypto.image} alt={crypto.name} width="25" height="25" />
                                {`${crypto.name} ` + String.fromCharCode(183) + ` ${crypto.symbol.toUpperCase()}`}
                            </td>
                            <td>
                                {currency.symbol}
                                {formatFloat(crypto.current_price)}
                            </td>
                            <td>
                                {currency.symbol}
                                {formatLargeNumber(crypto.total_volume)}
                            </td>                          
                            <td>
                                {currency.symbol}
                                {formatLargeNumber(crypto.market_cap)}
                            </td>
                            <td 
                                style={{color : parseFloat(crypto.price_change_percentage_24h) > 0 ? "#38A169" : "#E53E3E" }}
                                className="fw-bold"
                            >
                                {formatFloat(parseFloat(crypto.price_change_percentage_24h).toPrecision(2))}%
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
            {filteredCryptoData.length === 0 && <p className="text-center">No matches. Sorry!</p>}
        </div>
    )
}

export default Table
