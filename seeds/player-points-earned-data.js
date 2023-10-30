const { faker } = require("@faker-js/faker");

const { Player, PointSetting, Round, PlayerHole } = require("../models");
const { getRandomItemFromModel } = require("../routes/util-queries");

async function generatePlayerPointsEarned(numRecords) {
  const playerPointsEarned = [];
  for (let i = 0; i < numRecords; i++) {
    const pointSetting = await getRandomItemFromModel(PointSetting);
    const maxFrequencyPerScope = pointSetting?.maxFrequencyPerScope;
    const frequency = maxFrequencyPerScope
      ? faker.number.int({ min: 1, max: maxFrequencyPerScope })
      : 1;
    const { id: player_id } = await getRandomItemFromModel(Player);

    playerPointsEarned.push({
      playerId: player_id,
      pointSettingId: pointSetting.id,
      frequency,
    });
  }

  return playerPointsEarned;
}

module.exports = generatePlayerPointsEarned;
