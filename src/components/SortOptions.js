import React from "react";

export const SortOptions = ({setSortMethod}) => {
    return (
        <div className='sort-options'>
            <label>Sort by:</label>
            <select onChange={(e) => setSortMethod(e.target.value)}>
                <option value="default">Default</option>
                <option value="alphabetical">Alphabetical</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
            </select>
        </div>
    )
}