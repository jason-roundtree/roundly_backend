const { User, League, UserLeague } = require("../models");
const { getAllUsers, getLeague } = require("../controllers/util-queries");
const { createRecords } = require("./index");

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
