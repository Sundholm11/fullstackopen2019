import React from 'react'

const Header = ({text}) => {
    return (
        <div>
            <h1>{text}</h1>
        </div>
    )
}

const CourseHeader = ({text}) => {
    return ( 
        <div>
            <h2>{text}</h2>
        </div>
    )
}

const Content = ({parts}) => {
    const course = () => parts.map( part => 
        <Part key={part.id} part={part.name} exercises={part.exercises} />)
    return(
        <div>{course()}</div>
    )
}

const Total = ({parts}) => {
    const total = parts.reduce( (sum, part) => sum + part.exercises, 0)
    return(
        <div>
            <p>Total number of exercises: {total}</p>
        </div>
    )
}

const Part = ({part, exercises}) => {
    return(
        <div>
            <p>{part}, {exercises} exercises</p>
        </div>
    )
}

const Course = ({name, courses}) => {
    if (courses === undefined) {
        return(
            <Header text={name} />
        )
    }
    return(
        <div>
            <CourseHeader text={name} />
            <Content parts={courses} />
            <Total parts={courses} />
        </div>
    )
}
export default Course