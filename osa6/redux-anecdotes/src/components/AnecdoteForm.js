import React from 'react'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        props.newAnecdote(newAnecdote)
        props.notificationChange(`You added ${content}`)
        setTimeout(() => {
            props.notificationChange('')
        }, 5000)
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

const mapDispatchToProps = {
    newAnecdote: newAnecdote,
    notificationChange: notificationChange
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteForm)