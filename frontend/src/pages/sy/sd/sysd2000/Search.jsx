import React from "react";

function Search({ onSearch }) {

    return (
        <div className="search-box">

            <button
                type="button"
                onClick={onSearch}
            >
                조회
            </button>

        </div>
    );
}

export default Search;