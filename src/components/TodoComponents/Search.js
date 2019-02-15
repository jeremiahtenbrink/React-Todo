import React from "react";
import PropTypes from "prop-types";

const Search = ( props ) => {
    debugger;
    return (
        <div className="search">
            <form className="search__form">
                <input onChange={(e) => props.searhFun(e)} type="text" value={(props.searchWord ? props.searchWord: '' )} /><span className="icon-search"/>
            </form>
        </div>
    );
};


export default Search;
