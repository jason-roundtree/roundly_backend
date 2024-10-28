const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db_connection");

class League extends Model {}

League.init(
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
    startDate: {
      type: DataTypes.DATEONLY,
    },
    endDate: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    sequelize,
    modelName: "league",
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = League;
