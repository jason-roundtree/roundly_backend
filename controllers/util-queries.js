const { User, League } = require("../models");

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

module.exports = {
  getAllUsers,
  getLeague,
};
