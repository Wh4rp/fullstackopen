import { useState, useEffect } from 'react'
import axios from 'axios'

const Persons = ({ persons }) => (
  <>
    {persons.map((person) =>
      <p key={person.name}>{person.name} {person.number}</p>
    )}
  </>
)

const Filter = ({ filter, handler }) => (
  <form>
    <div>
      filter shown with
      <input
        value={filter}
        onChange={handler}
      />
    </div>
  </form>
)

const PersonForm = ({ name, handleName, number, handleNumber, handleClick }) => (
  <form>
    <div>
      name:
      <input
        value={name}
        onChange={handleName}
      />
    </div>
    <div>
      number:
      <input
        value={number}
        onChange={handleNumber}
      />
    </div>
    <div>
      <button type="submit" onClick={handleClick}>add</button>
    </div>
  </form>
)

const App = () => {
  const [persons, setPersons] = useState([])

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        console.log('get data')
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const personsToShow = filter.length === 0 ? persons : persons.filter((person) => (
    person.name.toLowerCase().includes(filter.toLowerCase()) || (person.number + '').includes(filter)
  ))

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleClick = (event) => {
    event.preventDefault()
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      axios
      .post(`http://localhost:3001/persons`, newPerson)
      .then(response => {console.log('response', response)})
      setPersons(persons.concat(newPerson))
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handler={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        name={newName}
        handleName={handleNameChange}
        number={newNumber}
        handleNumber={handleNumberChange}
        handleClick={handleClick}
      />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App