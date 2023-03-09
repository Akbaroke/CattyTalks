import { combineReducers } from '@reduxjs/toolkit';
import reducerUser from './user';
import reducerRoom from './room'

const rootReducer = combineReducers({
  user: reducerUser,
  room: reducerRoom,
})

export default rootReducer;
