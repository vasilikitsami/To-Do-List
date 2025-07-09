
export const CheckBox = ( {showOnlyIncomplete ,setShowOnlyIncomplete}) => {
    return (
        <div className='filter-checkbox'>
            <label>
                <input 
                type="checkbox"
                value={showOnlyIncomplete}
                onChange={(e) => setShowOnlyIncomplete(e.target.checked)}
                />
                Show only not completed
            </label>
        </div>
    )
}