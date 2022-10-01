import { useState } from 'react'

const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const ShowStat = ({ stat, value }) => (
  <p>{stat} {value}</p>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  function total() {
    return good + neutral + bad
  }

  function average() {
    return (good + neutral - bad) / total()
  }

  function positive() {
    return good / total() * 100 + ' %'
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="bad"/>
      <h2>statics</h2>
      <ShowStat stat="good" value={good}/>
      <ShowStat stat="neutral" value={neutral}/>
      <ShowStat stat="bad" value={bad}/>
      <ShowStat stat="total" value={total()}/>
      <ShowStat stat="average" value={average()}/>
      <ShowStat stat="positive" value={positive()}/>
    </div>
  )
}

export default App