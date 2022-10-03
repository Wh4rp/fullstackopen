import { useState, useEffect } from 'react'
import axios from 'axios'

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
  </>
)

const FoundCountries = ({ countries }) => {
  console.log('countries.length', countries.length)
  console.log('countries', countries)
  if (countries.length > 10 && countries.length != 0) {
    return <p>Too many matches, specify another filter</p>
  }
  else {
    if (countries.length > 1) {
      return <div>
        {countries.map((country) =>
          <div key={country.name}>
            {country.name}
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
      <FoundCountries countries={found} />
    </>
  )
}

export default App