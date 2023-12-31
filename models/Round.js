const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db_connection");

class Round extends Model {}

Round.init(
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
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "round",
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = Round;
