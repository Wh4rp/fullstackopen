import { useState, useEffect } from 'react'
import axios from 'axios'

const TOKEN = process.env.REACT_APP_WEATHER_API_KEY

const Weather = ({ capital }) => {

  const [weather, setWeather] = useState([])
  const temperature = weather.length === 0 ? 0 : (weather.main.temp - 273.15).toFixed(2)
  const wind = weather.length === 0 ? 0 : weather.wind.speed
  const icon = weather.length === 0 ? '10n' : weather.weather[0].icon

  const hook = () => {
    axios
      .get(`http://api.openweathermap.org/geo/1.0/direct?q=${capital}&limit=1&appid=${TOKEN}`)
      .then((response) => {
        console.log('response.data', response.data)
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?lat=${response.data[0].lat}&lon=${response.data[0].lon}&appid=${TOKEN}`)
          .then((response) => {
            console.log('weather', weather)
            setWeather(response.data)
          })
      })
  }

  useEffect(hook, [])

  return (
    <>
      <h3>Weather in {capital}</h3>
      <p>
        Temperature &nbsp; 
        {temperature} &nbsp; 
        Celsius
      </p>
      <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`}/>
      <p>wind &nbsp; {wind} m/s</p>
    </>
  )
}

const Country = ({ country }) => (
  <>
    <h2>{country.name}</h2>
    <p>
      Capital &nbsp;{country.capital}
      <br />
      area &nbsp;{country.area}
    </p>
    <h3>languages</h3>
    <ul>
      {country.languages.map((language) =>
        <li key={language.name}>{language.name}</li>
      )}
    </ul>
    <img
      src={country.flag}
      alt={`${country.name} flag`}
      style={{ width: '270px', height: '200px' }}
    />
    <Weather capital={country.capital} />
  </>
)

const FoundCountries = ({ countries, handleButton }) => {
  if (countries.length > 10 && countries.length !== 0) {
    return <p>Too many matches, specify another filter</p>
  }
  else {
    if (countries.length > 1) {
      return <div>
        {countries.map((country) =>
          <div key={country.name}>
            {country.name}
            &nbsp;
            <button onClick={handleButton} value={country.name}>
              show
            </button>
          </div>
        )}
      </div>
    }
    if (countries.length === 1) {
      return <Country country={countries[0]} />
    }
  }
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [found, setFound] = useState([])

  const hook = () => {
    axios
      .get('https://restcountries.com/v2/all')
      .then((response) => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const handleChangeSearch = (event) => {
    const newSearch = event.target.value
    setSearch(newSearch)
    const newFound = countries.filter((country) => {
      return country.name.toLowerCase().includes(newSearch.toLowerCase())
    })
    setFound(newFound)
  }

  return (
    <>
      <form onSubmit={e => { e.preventDefault(); }}>
        find countries &nbsp;
        <input
          value={search}
          onChange={handleChangeSearch}
        />
      </form>
      <FoundCountries countries={found} handleButton={handleChangeSearch} />
    </>
  )
}

export default App