import { Sequelize } from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;

const Room = db.define(
  'tb_room',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: false,
    },
    id_user: {
      type: DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    time: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default Room;
