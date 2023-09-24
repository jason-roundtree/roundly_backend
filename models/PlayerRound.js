const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db_connection");
const { Player, Round } = require("./");

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
    roundId: {
      type: DataTypes.UUID,
      references: {
        model: Round,
        key: "id",
      },
    },
    // TODO: add auto calculated fields separately as virtuals?
    totalScore: {
      type: DataTypes.INTEGER,
    },
    totalPoints: {
      type: DataTypes.DECIMAL,
    },
  },
  {
    sequelize,
    modelName: "player_round",
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = PlayerRound;
