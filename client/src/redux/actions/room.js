import ActionType from '../actionType'

export const setRoom = (code, name) => ({
  type: ActionType.SET_ROOM,
  payload: {
    code,
    name,
  },
})
