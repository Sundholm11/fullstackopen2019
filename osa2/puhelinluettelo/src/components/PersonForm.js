import React from 'react'

const PersonForm = ( {submit, nameValue, nameHandler, numberValue, numberHandler} ) => {
    return (
        <form onSubmit={submit}>
            <div>
                Name: 
                <input
                    value={nameValue}
                    onChange={nameHandler}
                />
            </div>
            <div>
                Number:
                <input
                    value={numberValue}
                    onChange={numberHandler}
                />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
}

export default PersonForm