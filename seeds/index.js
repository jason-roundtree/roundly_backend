const generateUser = require("./user-data");
const generateLeague = require("./league-data");
const generateUserLeagues = require("./user-league-data");
const generateLeaguePlayers = require("./player-data");
const generateRound = require("./round-data");
const generatePlayerRounds = require("./player-round-data");

const { User, League, UserLeague, Player, Round } = require("../models");

const {
  getLeague,
  getAllUsers,
  getAllRounds,
} = require("../controllers/util-queries");

async function seedDatabase() {
  // TODO: destroy records from DB
  await createRecords(User, 8, generateUser);
  await createRecords(League, 1, generateLeague);
  const users = await getAllUsers();
  const league = await getLeague();
  const leagueId = league.id;
  const userLeagues = await generateUserLeagues(users, leagueId);
  console.log("userLeagues: \n\n\n", userLeagues);
  await createBulkRecords(UserLeague, userLeagues);
  const players = await generateLeaguePlayers(users, leagueId);
  await createBulkRecords(Player, players);
  await createRecords(Round, 3, generateRound);
  const rounds = await getAllRounds();
  const playerRounds = await generatePlayerRounds(players, rounds);
}

async function createRecords(model, numRecords = 0, fn) {
  console.log({ model, numRecords, fn: fn.name });
  for (let i = 0; i < numRecords; i++) {
    try {
      const createdRecord = await model.create(fn());
      console.log("successfully created record");
      // console.log("successfully created record: ", createdRecord);
    } catch (e) {
      console.log("createRecords error: ", e);
    }
  }
}

async function createBulkRecords(model, data) {
  console.log(">>>>> createBulkRecords data", data);
  try {
    const createdRecords = await model.bulkCreate(data);
    console.log("successfully bulk created records: ", createdRecords);
    // console.log("successfully created record: ", createdRecord);
  } catch (e) {
    console.log("creatBulkRecords error: ", e);
  }
}

seedDatabase();

// module.exports = {
//   createRecords,
//   createBulkRecords,
// };
