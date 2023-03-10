import dotenv from 'dotenv';
import Room from '../models/Room.js';
import { v4 as uuidv4 } from 'uuid';
import getUnixTimestamp from '../utils/unixTimeStamp.js';
import generateCodeRoom from '../utils/generateCodeRoom.js';
import Join from '../models/Join.js';
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
    if (!checkRoom) return res.status(401).json({ msg: 'Delete room failed' });

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

export const checkDuplicateRoom = async (req, res) => {
  const { code } = req.body;

  try {
    const check = await Room.findOne({
      where: {
        code: code,
      },
    });
    if (!check) return res.status(201).json({ msg: 'Code is available.' });
    res.json({ msg: 'Code is already' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: 'Check duplicate failed, please try again later.' });
  }
};

export const checkRoomForJoin = async (req, res) => {
  const { userId, code } = req.params;

  try {
    const qry1Room = await Room.findOne({
      where: {
        id_user: userId,
        code: code,
      },
    });
    if (qry1Room) return res.status(201).json({ msg: 'this room is yours self.' });
    const qry2Room = await Room.findOne({
      where: {
        code: code,
      },
    });
    if (!qry2Room) return res.status(202).json({ msg: 'room not found.' });
    res.json({ msg: 'room successfully found.' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: 'Check Room failed, please try again later.' });
  }
};

export const joinRoom = async (req, res) => {
  const { userId } = req.params;
  const { code } = req.body;

  try {
    const checkRoom = await Room.findOne({
      where: {
        id_user: userId,
        code: code,
      },
    });
    if (checkRoom) return res.status(401).json({ msg: 'this is not valid.' });

    // get idroom
    const qryRoom = await Room.findOne({
      where: {
        code: code,
      },
    });
    if (!qryRoom) return res.status(401).json({ msg: 'this is not valid.' });

    await Join.create({
      id: uuidv4(),
      id_room: qryRoom.id,
      id_user: userId,
    });
    res.json({ msg: 'Room join successfully' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: 'Join Room failed, please try again later.' });
  }
};

export const getRoomJoin = async (req, res) => {
  const { userId } = req.params;
  try {
    const qryJoin = await Join.findAll({
      where: {
        id_user: userId,
      },
    });

    const resDataNeeds = [];
    await Promise.all(
      qryJoin.map(async (data) => {
        try {
          const qryRoom = await Room.findOne({
            where: {
              id: data.id_room,
            },
          });

          resDataNeeds.push({
            code: qryRoom.code,
            name: qryRoom.name,
            time: qryRoom.time,
          });
        } catch (error) {
          console.log(error);
        }
      })
    );

    res.json(resDataNeeds);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: 'get room failed, please try again later.' });
  }
};

export const deleteJoin = async (req, res) => {
  const { userId, code } = req.params;

  try {
    // get room id
    const qryRoom = await Room.findOne({
      where: {
        code: code,
      },
    });
    if (!qryRoom) return res.status(401).json({ msg: 'Delete room failed' });

    const deleteRoom = await Join.destroy({
      where: {
        id_room: qryRoom.id,
        id_user: userId,
      },
    });
    if (!deleteRoom) return res.status(401).json({ msg: 'Delete room failed' });
    res.status(200).json({ msg: 'Delete room successfully' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: 'Delete room failed' });
  }
};

export const checkStatusRoom = async (req, res) => {
  const { code } = req.params;
  try {
    const qryRoom = await Room.findOne({
      where: {
        code: code,
      },
    });
    if (!qryRoom) return res.status(201).json({ msg: 'This room has expired or been deleted.' });

    res.json({ msg: 'Room is ready to use.' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: 'get room status failed, please try again later.' });
  }
};