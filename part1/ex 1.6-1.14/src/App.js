import { useState } from 'react'

const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({ text, value }) => (
  <p>{text} {value}</p>
)

const Statistics = ({ good, neutral, bad }) => {
  function total() {
    return good + neutral + bad
  }

  function average() {
    return (good + neutral - bad) / total()
  }

  function positive() {
    return good / total() * 100 + ' %'
  }

  if(total() === 0){
    return (<p>No feedback given</p>)
  }
  else{
    return (
      <div>
        <h2>statics</h2>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="total" value={total()}/>
        <StatisticLine text="average" value={average()}/>
        <StatisticLine text="positive" value={positive()}/>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App