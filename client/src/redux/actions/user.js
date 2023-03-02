import ActionType from '../actionType';

export const setLogin = (email, name, profilePicture) => ({
  type: ActionType.SET_LOGIN,
  payload: {
    email,
    name,
    profilePicture,
  },
});

export const setLogout = () => ({
  type: ActionType.SET_LOGOUT,
});
