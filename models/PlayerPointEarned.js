const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db_connection");
const { PointSetting, Player } = require("./");

class PlayerPointEarned extends Model {}

PlayerPointEarned.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    playerId: {
      type: DataTypes.UUID,
      references: {
        model: Player,
        key: "id",
      },
    },
    pointSettingId: {
      type: DataTypes.UUID,
      references: {
        model: PointSetting,
        key: "id",
      },
    },
    frequency: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
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
