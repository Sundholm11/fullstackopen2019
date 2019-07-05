import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {
    const [ countries, setCountries ] = useState([])
    const [ filter, setFilter ] = useState('')

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const handleShowButton = (name) => {
        return () => {
            setFilter(name)
        }
    }

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    return(
        <div>
            <Filter filter={filter} handler={handleFilterChange} />
            <Countries
                filter={filter} 
                countries={countries}
                handleShow={handleShowButton}
            />
        </div>
    )
}

export default App