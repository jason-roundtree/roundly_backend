const { faker } = require("@faker-js/faker");
const { Round } = require("../models");
const { getLeague } = require("../controllers/util-queries");
const { createRecords } = require("./index");

// (async () => {
//   const league = await getLeague();
//   generateRound(league.id);
// })();

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
    league_id: leagueId,
  };
}

// createRecords(Round, 3, generateRound);

module.exports = generateRound;
