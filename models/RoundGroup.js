const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db_connection");

class RoundGroup extends Model {}

RoundGroup.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "round_group",
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = RoundGroup;
