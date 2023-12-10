const User = require("./User");
const League = require("./League");
const UserLeague = require("./UserLeague");
const Player = require("./Player");
const PlayerHole = require("./PlayerHole");
const PlayerPointEarned = require("./PlayerPointEarned");
const PlayerRound = require("./PlayerRound");
const PointSetting = require("./PointSetting");
const Round = require("./Round");
const RoundPointSetting = require("./RoundPointSetting");
const RoundGroup = require("./RoundGroup");

League.belongsToMany(User, { through: UserLeague });
User.belongsToMany(League, { through: UserLeague });

League.hasMany(Player, { foreignKey: { allowNull: true } });
Player.belongsTo(League, { foreignKey: { allowNull: true } });

League.hasMany(Round, { foreignKey: { allowNull: false } });
Round.belongsTo(League, { foreignKey: { allowNull: false } });

// TODO: Change to allowNull false once Users are added?
// User.hasMany(Player, { foreignKey: { allowNull: false } });
// Player.belongsTo(User, { foreignKey: { allowNull: false } });
User.hasMany(Player);
Player.belongsTo(User);

Player.belongsToMany(Round, { through: PlayerRound });
Round.belongsToMany(Player, { through: PlayerRound });

RoundGroup.hasMany(Round);
Round.belongsTo(RoundGroup);

League.hasMany(PointSetting);
PointSetting.belongsTo(League);

Round.belongsToMany(PointSetting, { through: RoundPointSetting });
PointSetting.belongsToMany(Round, { through: RoundPointSetting });

PointSetting.hasMany(PlayerPointEarned);
PlayerPointEarned.belongsTo(PointSetting);

Player.hasMany(PlayerPointEarned);
PlayerPointEarned.belongsTo(Player);

Player.hasMany(PlayerHole);
PlayerHole.belongsTo(Player);

PlayerHole.hasMany(PlayerPointEarned);
PlayerPointEarned.belongsTo(PlayerHole);

Round.hasMany(PlayerPointEarned);
PlayerPointEarned.belongsTo(Round);

Round.hasMany(PlayerHole);
PlayerHole.belongsTo(Round);

module.exports = {
  User,
  League,
  UserLeague,
  Player,
  PlayerHole,
  PlayerPointEarned,
  PlayerRound,
  PointSetting,
  Round,
  RoundGroup,
};
