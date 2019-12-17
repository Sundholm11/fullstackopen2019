const sortAnecdotes = (state) => {
  return (
    state.sort((AnA, AnB) => AnB.votes - AnA.votes)
  )
}

const anecdoteReducer = (state = [], action) => {
  console.log('State now: ', state)
  console.log('Action: ', action)

  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(an => an.id === id)
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return sortAnecdotes(state.map(an => an.id !== id ? an : changedAnecdote))
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTE':
      return sortAnecdotes([...state, action.data])
    default:
      return state
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export const newAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}

export const vote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export default anecdoteReducer