const Header = (props) => (
  <h2>{props.course}</h2>
)

const Content = ({ parts }) => (
  <>
    {parts.map((part, id) => (
      <Part
        part={part.name} exercises={part.exercises} key={id}
      />
    ))}
  </>
)

const Part = (props) => (
  <p>
    {props.part} {props.exercises}
  </p>
)

const Total = ({ parts }) => {
  const total = parts.reduce(
    (prev, curr) => prev + curr.exercises,
    0
  )
  return (
    <b>Number of exercises {total}</b>
  )
}

const Course = ({ course }) => (
  <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
)

const Courses = ({ courses }) => (
  <>
    <h1>Web Develop Curriculum</h1>
    {courses.map((course, id) => (
      <Course course={course} />
    )
    )}
  </>
)

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Courses courses={courses} />
}

export default App