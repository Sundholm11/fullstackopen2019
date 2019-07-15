import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Numbers from './components/Numbers'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
    const [ persons, setPersons] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber] = useState('')
    const [ filter, setFilter] = useState('')
    const [ message, setMessage] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
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

    const checkPersons = (event) => {
        event.preventDefault()
        const newPerson = {
            name: newName,
            number: newNumber
        }
        const personNames = persons.map(person => person.name)
        const personNumbers = persons.map(person => person.number)
        if (personNumbers.includes(newPerson.number)) {
            window.alert(
                `Number ${newPerson.number} is already used by someone else in the phonebook`
            )
        }
        else if (personNames.includes(newPerson.name)) {
            if (window.confirm(`${newPerson.name} is already in the phonebook, replace the old number with new one?`)) {
                updatePersons(newPerson)
            }
        }
        else {
            addPersons(newPerson)
        }
        setNewName('')
        setNewNumber('')
    }
    
    const addPersons = (newPerson) => {
        personService
                .create(newPerson)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setMessage({name: `Added ${newPerson.name}`, type: 1})
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    setMessage({name: error.response.data.error, type: 0})
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
    }

    const updatePersons = (newPerson) => {
        const updateId = persons.find(person => person.name === newPerson.name)
        personService
            .update(updateId.id, newPerson)
            .then(returnedPerson => {
                setPersons(persons.map(person => person.id !== updateId.id ? person : returnedPerson))
                setMessage({name: `Updated ${newPerson.name}`, type: 1})
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            })
            .catch(error => {
                setMessage({name: `${updateId.name} has already been removed from the phonebook`, type: 0})
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            })
    }

    const removePersons = (id) => {
        const removedPerson = persons.find(person => person.id === id)
        if(window.confirm(`Do you really wanna remove this person from the phonebook?`)) {
            personService
                .remove(id, removedPerson)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== id))
                    setMessage({name: `Removed ${removedPerson.name}`, type: 1})
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    setMessage({name: `${removedPerson.name} has already been removed from the phonebook`, type: 0})
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} />
            <Filter filter={filter} handler={handleFilterChange} />
            <h3>Add a new number</h3>
            <PersonForm
                submit={checkPersons}
                nameValue={newName}
                nameHandler={handleNameChange}
                numberValue={newNumber}
                numberHandler={handleNumberChange}
            />
            <h3>Numbers</h3>
            <Numbers list={persons} filter={filter} handle={removePersons} />
        </div>
    )

}

export default App