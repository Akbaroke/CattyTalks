import ActionType from '../actionType'

const initState = {
  code: '',
  name: '',
  role: 'visitor',
}

const reducerRoom = (state = initState, action) => {
  switch (action.type) {
    case ActionType.SET_ROOM:
      return {
        code: action.payload.code,
        name: action.payload.name,
        role: action.payload.role,
      }
    case ActionType.UNSET_ROOM:
      return initState
    default:
      return state
  }
}

export default reducerRoom
