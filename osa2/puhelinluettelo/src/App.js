import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Numbers from './components/Numbers'

const App = () => {
    const [ persons, setPersons] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber] = useState('')
    const [ filter, setFilter] = useState('')

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }, [])

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const addPersons = (event) => {
        event.preventDefault()
        const newPerson = {
            name: newName,
            number: newNumber,
            id: persons.length + 1
        }
        const personNames = persons.map(person => person.name)
        const personNumbers = persons.map(person => person.number)
        if (personNames.includes(newPerson.name)) {
            window.alert(
                `${newPerson.name} is already in the phonebook`
            )
        }
        else if (personNumbers.includes(newPerson.number)) {
            window.alert(
                `Number ${newPerson.number} is already in the phonebook`
            )
        }
        else {
            setPersons(persons.concat(newPerson))
            setNewName('')
            setNewNumber('')
        }
    }
    
    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} handler={handleFilterChange} />
            <h3>Add a new number</h3>
            <PersonForm
                submit={addPersons}
                nameValue={newName}
                nameHandler={handleNameChange}
                numberValue={newNumber}
                numberHandler={handleNumberChange}
            />
            <h3>Numbers</h3>
            <Numbers list={persons} filter={filter} />
        </div>
    )

}

export default App