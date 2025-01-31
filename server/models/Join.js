import { Sequelize } from "sequelize";

const { DataTypes } = Sequelize;

const JoinModel = (db) => {
  return db.define(
    "tb_join",
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
};

export default JoinModel;
