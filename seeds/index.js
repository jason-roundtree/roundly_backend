const generateUser = require("./user-data");
const generateLeague = require("./league-data");
const generateUserLeagues = require("./user-league-data");
const generateLeaguePlayers = require("./player-data");
const generateRound = require("./round-data");
const generatePlayerRounds = require("./player-round-data");
const generatePointSetting = require("./point-setting-data");
const generatePlayerPointsEarned = require("./player-points-earned-data");

const {
  League,
  Player,
  PlayerPointEarned,
  PlayerRound,
  PointSetting,
  Round,
  User,
  UserLeague,
} = require("../models");

const {
  getAllRounds,
  getAllUsers,
  getLeague,
} = require("../controllers/util-queries");

async function seedDatabase() {
  // TODO: destroy records from DB
  // TODO: just return records from await-starting lines instead of using db calls in controllers?
  await createRecords(User, 8, generateUser);
  await createRecords(League, 1, generateLeague);
  const users = await getAllUsers();
  const league = await getLeague();
  const leagueId = league.id;
  const userLeagues = await generateUserLeagues(users, leagueId);
  await createBulkRecords(UserLeague, userLeagues);
  const players = await generateLeaguePlayers(users, leagueId);
  await createBulkRecords(Player, players);
  await createRecords(Round, 3, generateRound);
  const rounds = await getAllRounds();
  const playerRounds = await generatePlayerRounds(players, rounds);
  await createBulkRecords(PlayerRound, playerRounds);
  await createRecords(PointSetting, 5, generatePointSetting);
  const playPointsEarned = await generatePlayerPointsEarned(12);
  await createBulkRecords(PlayerPointEarned, playPointsEarned);
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
