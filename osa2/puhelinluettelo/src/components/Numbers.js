import React from 'react'

const Note = ({ name, number, handle, id }) => (
    <li>
        {name} {number} <button onClick={() => handle(id)}>Remove</button>
    </li>
)

const Numbers = ( {list, filter, handle} ) => {
    const listNumbers = (list, filter) => (
        list
            .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
            .map(person => 
                <Note
                    key={person.id}
                    name={person.name}
                    number={person.number}
                    handle={handle}
                    id={person.id}
                />
            )
    )
    return (
        <ul>{listNumbers(list, filter)}</ul>
    )
}

export default Numbers