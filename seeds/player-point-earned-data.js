const { faker } = require("@faker-js/faker");
const { Player, PointSetting, Round, PlayerHole } = require("../models");
const {
  getAllPlayers,
  //   getRandomPlayer,
  getRandomPointSetting,
} = require("../controllers/util-queries");
const { createRecords, createBulkRecords } = require("./index");

// (async () => {
//   const players = await getAllPlayers();
//   if (players) {
//   }
// })();

async function generatePlayerPointsEarned() {
  const players = await getAllPlayers();
  console.log("players: ", players);
  const randomPointSetting = await getRandomPointSetting();
  console.log("randomPointSetting: ", randomPointSetting);
}

generatePlayerPointsEarned();
