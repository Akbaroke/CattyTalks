import UserModel from "./User.js";
import RoomModel from "./Room.js";
import JoinModel from "./Join.js";
import ChatModel from "./Chat.js";

const initModels = (db) => {
  const User = UserModel(db);
  const Room = RoomModel(db);
  const Join = JoinModel(db);
  const Chat = ChatModel(db);

  return { User, Room, Join, Chat };
};

export default initModels;
