import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ( {capital} ) => {
    const [ weather, setWeather ] = useState([])

    useEffect(() => {
        axios
            .get(`http://api.apixu.com/v1/current.json?key=c6b3e6676c1a43ad8d195809190507&q=${capital}`)
            .then(response => {
                setWeather(response.data)
            })
    }, [capital])

    if (weather.length === 0) {
        return <p>Weather being loaded</p>
    }
    return(
        <div>
            <p>Temperature: {weather.current.temp_c}</p>
            <p>Wind: {weather.current.wind_kph} kph towards {weather.current.wind_dir}</p>
            <img 
                src={weather.current.condition.icon} 
                alt={weather.current.condition.text + " weather"}
                height="100"
            />
        </div>
    )

}

export default Weather