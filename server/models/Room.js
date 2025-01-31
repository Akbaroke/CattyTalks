import { Sequelize } from "sequelize";

const { DataTypes } = Sequelize;

const RoomModel = (db) => {
  return db.define(
    "tb_room",
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
};

export default RoomModel;
