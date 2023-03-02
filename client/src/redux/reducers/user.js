import ActionType from '../actionType';

const initState = {
  isAuth: false,
  name: null,
  email: null,
  profilePicture: null,
};

const reducerUser = (state = initState, action) => {
  switch (action.type) {
    case ActionType.SET_LOGIN:
      return {
        isAuth: true,
        name: action.payload.name,
        email: action.payload.email,
        profilePicture: action.payload.profilePicture,
      };
    case ActionType.SET_LOGOUT:
      return initState;
    default:
      return state;
  }
};

export default reducerUser;
