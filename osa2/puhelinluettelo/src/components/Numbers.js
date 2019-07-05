import React from 'react'

const Note = ({ name, number }) => (
    <li>{name} {number}</li>
)

const Numbers = ( {list, filter} ) => {
    const listNumbers = (list, filter) => (
        list
            .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
            .map(person => 
                <Note
                    key={person.id}
                    name={person.name}
                    number={person.number}
                />
            )
    )
    return (
        <ul>{listNumbers(list, filter)}</ul>
    )
}

export default Numbers