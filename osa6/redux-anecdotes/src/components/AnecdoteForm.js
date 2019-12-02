import React from 'react'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { notificationChanged } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.store.dispatch(newAnecdote(content))
        notificationChanged(props.store, `You added ${content}`)
    }

    return (
        <form onSubmit={addAnecdote} >
            <h2>Create new</h2>
            <div>
                <input name="anecdote"/>
            </div>
            <button type="submit">Create</button>
        </form>
    )
}

export default AnecdoteForm