const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db_connection");

class PointSetting extends Model {}

PointSetting.init(
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
    // TODO: should there be a "point" setting model for accomplishments that aren't point based?
    value: {
      type: DataTypes.DECIMAL,
      get() {
        return parseFloat(this.getDataValue("value"));
      },
      allowNull: false,
      isDecimal: true,
    },
    scope: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          // TODO: add roundGroup?
          args: [["hole", "round", "no_scope"]],
          msg: "Invalid scope",
        },
      },
    },
    maxFrequencyPerScope: {
      type: DataTypes.INTEGER,
    },
    isLeagueSetting: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: "is_league_setting",
    },
  },
  {
    sequelize,
    modelName: "point_setting",
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = PointSetting;
