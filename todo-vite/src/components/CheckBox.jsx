
export const CheckBox = ( {setShowOnlyIncomplete}) => {
    return (
        <div className='filter-checkbox'>
            <label>
                <input 
                type="checkbox"
                onChange={(e) => setShowOnlyIncomplete(e.target.checked)}
                />
                Show only not completed
            </label>
        </div>
    )
}