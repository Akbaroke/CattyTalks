import { Sequelize } from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;

const Chat = db.define(
  'tb_chat',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_room: {
      type: DataTypes.STRING,
    },
    id_user: {
      type: DataTypes.STRING,
    },
    message: {
      type: DataTypes.STRING,
    },
    time: {
      type: DataTypes.STRING,
    },
    trash: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default Chat;
