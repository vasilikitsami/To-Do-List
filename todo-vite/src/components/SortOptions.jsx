import React from "react";

export const SortOptions = ({sortMethod,setSortMethod}) => {
    return (
        <div className='sort-options'>
            <label>Sort by:</label>
            <select value={sortMethod} onChange={(e) => setSortMethod(e.target.value)}>
                <option value="default">Default</option>
                <option value="alphabetical">Alphabetical</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
            </select>
        </div>
    )
}