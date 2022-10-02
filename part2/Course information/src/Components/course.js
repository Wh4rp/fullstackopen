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
        <h1>Web Development Curriculum</h1>
        {courses.map((course, id) => (
            <Course course={course} />
        )
        )}
    </>
)

export default Courses