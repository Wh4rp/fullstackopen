import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}> {text} </button>
)

const Anecdote = ({ anecdote, votes }) => (
  <p>
    {anecdote}
    <br/>
    has {votes} votes
  </p>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)

  const [points, setPoints] = useState({
    0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6:0
  })

  const [most_votes, setMostVotes ] = useState(0)

  const vote = () => {
    const newPoints = { ...points }
    newPoints[selected] += 1
    setPoints(newPoints)
    if(newPoints[most_votes] < newPoints[selected]){
      setMostVotes(selected)
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={points[selected]}/>
      <Button handleClick={vote} text="vote" />
      <Button handleClick={() => setSelected(Math.floor(Math.random() * 7))} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={anecdotes[most_votes]} votes={points[most_votes]}/>
    </div>
  )
}

export default App