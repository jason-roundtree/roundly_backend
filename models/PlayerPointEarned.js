const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db_connection");
const PointSetting = require("./PointSetting");
const Player = require("./Player");

class PlayerPointEarned extends Model {}

PlayerPointEarned.init(
  {
    // id: {
    //   type: DataTypes.UUID,
    //   defaultValue: DataTypes.UUIDV4,
    //   allowNull: false,
    //   primaryKey: true,
    // },
    playerId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: Player,
        key: "id",
      },
    },
    pointSettingId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: PointSetting,
        key: "id",
      },
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
