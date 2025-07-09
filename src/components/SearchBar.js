import React from "react";

export const SearchBar = ({setSearchTerm}) => {
    return (
        <div className='search-bar'>
            <input
            type="text"
            className="todo-input"
            placeholder='Search Tasks'
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    )
}