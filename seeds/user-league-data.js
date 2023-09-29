const { UserLeague } = require("../models");
const { getAllUsers, getLeague } = require("../controllers/util-queries");
const { createRecords } = require("./index");

async function generateUserLeagues(users, leagueId) {
  //   console.log("users", users);
  return users.map((user) => {
    return {
      userId: user.id,
      leagueId: leagueId,
    };
  });
}

// createUserLeagues();

module.exports = generateUserLeagues;
