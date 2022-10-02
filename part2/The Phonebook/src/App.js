import { useState } from 'react'

const ShowPersons = ({ persons }) => (
  <>
    {persons.map((person) =>
      <p key={person.name}>{person.name}</p>
    )}
  </>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleClick = (event) => {
    event.preventDefault()
    if (persons.some((person) => person.name == newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat({
        name: newName
      }))
    }
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit" onClick={handleClick}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ShowPersons persons={persons} />
    </div>
  )
}

export default App