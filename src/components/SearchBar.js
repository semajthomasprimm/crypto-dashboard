const SearchBar = (props) => {
  return (
    <div className="col-lg-4 my-2">
      <input
        className="form-control"
        type="text"
        placeholder="BTC, DOGE, ETH, etc."
        onChange={e => props.setQuery(e.target.value)}
        value={props.query}
      />
    </div>
  );
}

export default SearchBar;