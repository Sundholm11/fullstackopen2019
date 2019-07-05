import React from 'react'
import Weather from './Weather'

const Language = ( {language} ) => (
    <li>{language}</li>
)

const CountryListed = ( {name, handle} ) => {
    return(
        <li>
            {name}
            <button onClick={handle(name)}>
                Show
            </button>
        </li>
    )
}

const CountryDetail = ( {country} ) => {
    return(
        <div>
            <h2>{country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h3>Languages:</h3>
            <ul>
                {country.languages
                    .map(language =>
                        <Language
                            key={language.iso639_1}
                            language={language.name}
                        />
                    )
                }
            </ul>
            <img 
                src={country.flag} 
                alt={`Flag of ${country.name}`} 
                height="100" 
            />
            <h3>Weather in {country.capital}</h3>
            <Weather capital={country.capital} />
        </div>
    )
}

const Countries = ( {filter, countries, handleShow} ) => {
    const listCountries = (countries, filter) => (
        countries
            .filter(country => 
                country.name.toLowerCase().includes(filter.toLowerCase()))
    )
    const listedCountries = listCountries(countries, filter)
    if (filter.length === 0) {
        return(
            <p></p>
        )
    }
    else if (listedCountries.length > 10) {
        return(
            <p>Too many matches, specify more</p>
        )
    }
    else if (listedCountries.length > 1) {
        return (
            <ul>
                {listedCountries
                    .map(country => 
                        <CountryListed
                            key={country.numericCode}
                            name={country.name}
                            handle={handleShow}
                        />
                )}
            </ul>
        )
    }
    else if (listedCountries.length === 1) {
        return(
            <CountryDetail country = {listedCountries[0]} />
        )
    }
}

export default Countries