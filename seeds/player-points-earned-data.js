const { faker } = require("@faker-js/faker");

const { Player, PointSetting, Round, PlayerHole } = require("../models");
const { getRandomItemFromModel } = require("../routes/util-queries");

async function generatePlayerPointsEarned(numRecords) {
  const playerPointsEarned = [];
  for (let i = 0; i < numRecords; i++) {
    const pointSetting = await getRandomItemFromModel(PointSetting);
    const { id: player_id } = await getRandomItemFromModel(Player);

    playerPointsEarned.push({
      playerId: player_id,
      pointSettingId: pointSetting.id,
      quantity: 1,
    });
  }

  return playerPointsEarned;
}

module.exports = generatePlayerPointsEarned;
