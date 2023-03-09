import { Sequelize } from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;

const Join = db.define(
  'tb_join',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: false,
    },
    id_room: {
      type: DataTypes.STRING,
    },
    id_user: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default Join;
