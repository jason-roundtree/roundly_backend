const { faker } = require("@faker-js/faker");
const { Player, User } = require("../models");
const { getAllUsers, getLeague } = require("../controllers/util-queries");
const { createRecords, createBulkRecords } = require("./index");

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

async function generateLeaguePlayers() {
  const league = await getLeague();
  const users = await getAllUsers();
  const leaguePlayers = users.map((user) => {
    return generatePlayer(user.id, league.id);
  });
  return leaguePlayers;
}

(async () => {
  const leaguePlayers = await generateLeaguePlayers();
  createBulkRecords(Player, leaguePlayers);
})();

// createRecords(Player, 9, generatePlayer);
