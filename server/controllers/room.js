import dotenv from 'dotenv';
import Room from '../models/Room.js';
import { v4 as uuidv4 } from 'uuid';
import getUnixTimestamp from '../utils/unixTimeStamp.js';
import generateCodeRoom from '../utils/generateCodeRoom.js';
dotenv.config();

export const createRoom = async (req, res) => {
  const { userId } = req.params;
  let { name, code } = req.body;
  try {
    if (name === undefined) throw new Error('name is undefined');
    if (name.length < 4) throw new Error('name is too short');
    if (name.length > 20) throw new Error('name is too long');
    if (code) {
      if (code.length !== 6) throw new Error('code must be 6 characters long');
    } else {
      code = await generateCodeRoom();
    }

    // check for limit create room max 3 room
    const countRoom = await Room.findAll({
      where: {
        id_user: userId,
      },
    });
    if (countRoom.length === 3) throw new Error('maximum number of rooms reached');

    // check code not duplicated in room
    const countCode = await Room.findAll({
      where: {
        id_user: userId,
        code: code,
      },
    });
    if (countCode > 0) throw new Error('room code already exists');

    await Room.create({
      id: uuidv4(),
      id_user: userId,
      code: code,
      name: name,
      time: getUnixTimestamp(),
    });
    res.json({ msg: 'Room created successfully' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: 'create room failed, please try again later.' });
  }
};

export const getRoom = async (req, res) => {
  const { userId } = req.params;
  try {
    const rooms = await Room.findAll({
      where: {
        id_user: userId,
      },
    });
    res.json(rooms);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: 'get room failed, please try again later.' });
  }
};

export const deleteRoom = async (req, res) => {
  const { ui, ri } = req.query;
  console.log(ui, ri);

  try {
    const checkRoom = await Room.findOne({
      where: {
        id: ri,
        id_user: ui,
      },
    });
    if (!checkRoom) res.status(200).json({ msg: 'Delete room successfully' });

    await Room.destroy({
      where: {
        id: ri,
        id_user: ui,
      },
    });
    res.status(200).json({ msg: 'Delete room successfully' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: 'Delete room failed' });
  }
};