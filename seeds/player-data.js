const { faker } = require("@faker-js/faker");

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

module.exports = generateLeaguePlayers;
