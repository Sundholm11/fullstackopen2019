import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => <h1>{text}</h1>

const Content = ({text, value, text2}) => <p>{text} {value} {text2}</p>

const Button = ({handle, text}) => (
    <button onClick={handle}>
        {text}
    </button>
)

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(
        new Array(props.anecdotes.length).fill(0)
    )

    const setSelectedAnecdote = () => (
        setSelected(Math.floor(Math.random() * props.anecdotes.length))
    )

    const setSelectedPoints = () => {
        const copy = [...points]
        copy[selected] += 1
        return(
            setPoints(copy)
        )
    }
    
    const mostVoted = points.indexOf(Math.max(...points))
    
    return (
    <div>
        <Header text="Anecdote of the day" />
        <Content text={props.anecdotes[selected]} />
        <Content
            text="Anecdote has"
            value={points[selected]}
            text2="votes"
        />
        <Button handle={setSelectedPoints} text="Vote" />
        <Button handle={setSelectedAnecdote} text="Next" />
        <Header text="Most voted anecdote" />
        <Content
            text={props.anecdotes[mostVoted]}
        />
    </div>
    )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)