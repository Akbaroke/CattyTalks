import ActionType from '../actionType';

export const setLogin = (id, email, name, profilePicture) => ({
  type: ActionType.SET_LOGIN,
  payload: {
    id,
    email,
    name,
    profilePicture,
  },
});

export const setLogout = () => ({
  type: ActionType.SET_LOGOUT,
});
