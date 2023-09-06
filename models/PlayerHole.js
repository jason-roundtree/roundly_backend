const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db_connection");

class PlayerHole extends Model {}

PlayerHole.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    hole: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 18,
      },
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "player_hole",
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = PlayerHole;
