import anecdoteService from '../services/anecdotes'

const sortAnecdotes = (state) => {
  return (
    state.sort((AnA, AnB) => AnB.votes - AnA.votes)
  )
}

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      return sortAnecdotes(state.map(an => an.id !== id ? an : action.data))
    case 'INIT_ANECDOTES':
      return sortAnecdotes(action.data)
    case 'NEW_ANECDOTE':
      return sortAnecdotes([...state, action.data])
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const newAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const vote = (anecdote) => {
  return async dispatch => {
    const changedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const updatedAnecdote = await anecdoteService.update(changedAnecdote.id, changedAnecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export default anecdoteReducer