const Header = (props) => (
  <h1>{props.course}</h1>
)

const Content = ({ parts }) => (
  <div>
    {parts.map((part, id) => (
      <Part
        part={part.name} exercises={part.exercises} key={id}
      />
    ))}
  </div>
)

const Part = (props) => (
  <p>
    {props.part} {props.exercises}
  </p>
)

// const Total = (props) => {
//   const total = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
//   return (
//     <p>Number of exercises {total}</p>
//   )
// }

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    {/* <Total parts={course.parts} /> */}
  </div>
)

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App