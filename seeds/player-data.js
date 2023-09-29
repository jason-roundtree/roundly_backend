const { faker } = require("@faker-js/faker");
const { Player } = require("../models");
const { getAllUsers, getLeague } = require("../controllers/util-queries");
const { createBulkRecords } = require("./index");

function generatePlayer(userId, leagueId) {
  const id = faker.string.uuid();
  const name = faker.lorem.words({ min: 1, max: 2 });
  return {
    id,
    name,
    userId,
    leagueId,
  };
}

async function generateLeaguePlayers(users, leagueId) {
  const leaguePlayers = users.map((user) => {
    return generatePlayer(user.id, leagueId);
  });
  return leaguePlayers;
}

// (async () => {
//   const leaguePlayers = await getLeaguePlayers();
//   createBulkRecords(Player, leaguePlayers);
// })();

// createRecords(Player, 9, generatePlayer);

module.exports = generateLeaguePlayers;
