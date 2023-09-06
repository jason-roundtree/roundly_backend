const { User, League, UserLeague } = require("../models");
const createRecords = require("./index");

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

async function createUserLeagues() {
  const users = await getAllUsers();
  //   console.log("users", users);
  const league = await getLeague();
  //   console.log("league", league);

  for (const user of users) {
    try {
      const userLeague = await UserLeague.create({
        userId: user.id,
        leagueId: league.id,
      });
      console.log("userLeague:::::: ", userLeague);
    } catch (err) {
      console.log("create userLeague error: ", err);
    }
  }
}

createUserLeagues();
