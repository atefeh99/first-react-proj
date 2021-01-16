import React from 'react';

const Search = ({onSearch, onKeyPress, value}) =>(
    <div>
        <label htmlFor="searchInput">Search: </label>
        <input value={value} type="text" id="searchInput" onChange={onSearch} onKeyPress={onKeyPress} /><br />
    </div>
);

export default Search;