const { User, League, Player, Round, PointSetting } = require("../models");

async function getAllUsers() {
  try {
    const users = await User.findAll();
    return users;
  } catch (err) {
    console.log("getAllUsers error: ", err);
  }
}

async function getLeague() {
  try {
    const league = await League.findOne();
    return league;
  } catch (err) {
    console.log("getLeague error: ", err);
  }
}

async function getAllRounds() {
  try {
    const rounds = await Round.findAll();
    return rounds;
  } catch (err) {
    console.log("getAllRounds error: ", err);
  }
}

async function getAllPlayers() {
  try {
    const players = await Player.findAll();
    return players;
  } catch (err) {
    console.log("getPlayer error: ", err);
  }
}

async function getRandomPointSetting() {
  try {
    const randomPointSetting = await PointSetting.findOne({
      order: "random()",
    });
    console.log("randomPointSetting: ", randomPointSetting);
  } catch {
    console.log("getRandomPointSetting error: ", err);
  }
}

module.exports = {
  getAllUsers,
  getLeague,
  getAllPlayers,
  getAllRounds,
  getRandomPointSetting,
};
