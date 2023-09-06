const { faker } = require("@faker-js/faker");
const PointSetting = require("../models/PointSetting");
const createRecords = require("./index");

function generatePointSetting() {
  const id = faker.string.uuid();
  const name = faker.lorem.words({ min: 1, max: 2 });
  const value = faker.number.int({ min: -50, max: 200 });
  const scope = faker.helpers.arrayElement(["hole", "round"]);
  const maxFrequencyPerScope = faker.helpers.arrayElement([
    faker.number.int({ min: 1, max: 5 }),
    null,
  ]);
  const isLeagueSetting = faker.helpers.arrayElement([true, false]);

  return {
    id,
    name,
    value,
    scope,
    maxFrequencyPerScope,
    isLeagueSetting,
  };
}

createRecords(PointSetting, 5, generatePointSetting);
