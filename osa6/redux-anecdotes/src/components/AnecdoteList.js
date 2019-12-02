import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { notificationChanged } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const anecdotes = props.store.getState().anecdotes

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(props.store.getState().filter.toLowerCase()))
                .map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => {
                        props.store.dispatch(vote(anecdote.id))
                        notificationChanged(props.store, `You voted ${anecdote.content}`)}}>Vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList