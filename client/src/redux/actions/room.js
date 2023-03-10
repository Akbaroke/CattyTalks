import ActionType from '../actionType'

export const setRoom = (code, name, role) => ({
  type: ActionType.SET_ROOM,
  payload: {
    code,
    name,
    role,
  },
})

export const unsetRoom = () => ({
  type: ActionType.UNSET_ROOM,
})