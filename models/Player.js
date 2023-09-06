const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db_connection");

class Player extends Model {}

Player.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "player",
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = Player;
