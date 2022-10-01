import { useState } from 'react'

const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const ShowOption = ({ option, count }) => (
  <p>{option} {count}</p>
)

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
      <h2>statics</h2>
      <ShowOption option="good" count={good}/>
      <ShowOption option="neutral" count={neutral}/>
      <ShowOption option="bad" count={bad}/>
    </div>
  )
}

export default App