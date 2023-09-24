const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db_connection");
const { PointSetting, Round } = require("./");

class RoundPointSetting extends Model {}

RoundPointSetting.init(
  {
    pointSettingId: {
      type: DataTypes.UUID,
      references: {
        model: PointSetting,
        key: "id",
      },
    },
    roundId: {
      type: DataTypes.UUID,
      references: {
        model: Round,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "round_point_setting",
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = RoundPointSetting;
