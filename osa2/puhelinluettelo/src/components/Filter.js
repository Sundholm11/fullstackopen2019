import React from 'react'

const Filter = ( {filter, handler} ) => {
    return (
        <div>
            Filter shown with
            <input
                value={filter}
                onChange={handler}
            />
        </div>
    )
}

export default Filter