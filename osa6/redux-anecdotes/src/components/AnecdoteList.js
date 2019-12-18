import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    return (
        <div>
            <h2>Anecdotes</h2>
            {props.anecdotesToShow.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => {
                        props.vote(anecdote)
                        props.notificationChange(`You voted ${anecdote.content}`, 5)
                    }}>Vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

const anecdotesFiltered = ({anecdotes, filter}) => {
    return anecdotes.filter(
        anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
}

const mapStateToProps = (state) => {
    return {
        anecdotesToShow: anecdotesFiltered(state)
    }
}

const mapDispatchToProps = {
    vote: vote,
    notificationChange: notificationChange
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)