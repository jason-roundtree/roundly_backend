const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db_connection");

const Player = require("./Player");
const League = require("./League");

class PlayerRound extends Model {}

PlayerRound.init(
  {
    playerId: {
      type: DataTypes.UUID,
      references: {
        model: Player,
        key: "id",
      },
    },
    leagueId: {
      type: DataTypes.UUID,
      references: {
        model: League,
        key: "id",
      },
    },
    // TODO: should these only be calculated based on individual holes and round or can they also be tracked here
    // totalScore: {
    //     type: DataTypes.INTEGER,
    // },
    // totalPoints: {
    //     type: DataTypes.INTEGER,
    // }
  },
  {
    sequelize,
    modelName: "player_round",
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = Player;
