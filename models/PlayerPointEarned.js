const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db_connection");

class PlayerPointEarned extends Model {}

PlayerPointEarned.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "player_point_earned",
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = PlayerPointEarned;
