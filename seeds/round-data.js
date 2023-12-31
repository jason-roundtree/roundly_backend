const { faker } = require("@faker-js/faker");

function generateRound(leagueId) {
  const id = faker.string.uuid();
  const name = faker.lorem.words({ min: 1, max: 3 });
  const location = faker.lorem.words({ min: 1, max: 3 });
  const date = faker.date.future({ years: 0.75 });

  return {
    id,
    name,
    date,
    location,
    leagueId,
  };
}

function generateRounds(numRecords, leagueId) {
  const roundsData = [];
  for (let i = 0; i < numRecords; i++) {
    roundsData.push(generateRound(leagueId));
  }
  return roundsData;
}

module.exports = generateRounds;
