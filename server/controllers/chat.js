import dotenv from "dotenv";
import { models } from "../config/database.js";
import getUnixTimestamp from "../utils/getUnixTimestamp.js";
const { Chat, Room, User } = models;
dotenv.config();

export const getAllMessages = async (req, res) => {
  const { room } = req.params;

  try {
    // get idRoom
    const qryRoom = await Room.findOne({
      where: {
        code: room,
      },
    });

    // get all chat
    const qryChat = await Chat.findAll({
      where: {
        id_room: qryRoom.id,
      },
    });

    const resDataNeeds = [];
    await Promise.all(
      qryChat.map(async (data) => {
        try {
          const qryUser = await User.findOne({
            where: {
              id: data.id_user,
            },
          });

          resDataNeeds.push({
            id: data.id,
            id_user: data.id_user,
            profile_picture: qryUser.profile_picture,
            name: qryUser.name,
            message: data.message,
            time: data.time,
            trash: data.trash,
          });
        } catch (error) {
          console.log(error);
        }
      })
    );

    res.json(resDataNeeds);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ msg: "get message failed, please try again later." });
  }
};

export const addMessage = async (req, res) => {
  const { userId } = req.params;
  const { room, message } = req.body;

  try {
    // get idRoom
    const qryRoom = await Room.findOne({
      where: {
        code: room,
      },
    });

    // insert message
    await Chat.create({
      id_room: qryRoom.id,
      id_user: userId,
      message: message,
      time: getUnixTimestamp(),
    });
    res.json({ msg: "message successfully sent." });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ msg: "sent message failed, please try again later." });
  }
};

export const deleteMessage = async (req, res) => {
  const { userId } = req.params;
  const { id } = req.body;

  try {
    // check this message belongs to himself
    const qryChat = await Chat.findOne({
      id: id,
    });
    if (qryChat.id_user !== userId)
      return res.status(401).json({ msg: "this is not your message." });

    await Chat.update(
      {
        trash: true,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.json({ msg: "message successfully deleted." });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ msg: "deleted message failed, please try again later." });
  }
};
