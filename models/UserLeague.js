const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db_connection");

const User = require("./User");
const League = require("./League");

class UserLeague extends Model {}

UserLeague.init(
  {
    userId: {
      type: DataTypes.UUID,
      references: {
        model: User,
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
  },
  {
    sequelize,
    modelName: "user_league",
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = UserLeague;
