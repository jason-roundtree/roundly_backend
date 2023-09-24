const { faker } = require("@faker-js/faker");
const { League } = require("../models");
const { createRecords } = require("./index");

function generateLeague() {
  const name = faker.lorem.words({ min: 1, max: 3 });
  const id = faker.string.uuid();
  const startDate = faker.date.recent();
  const endDate = faker.date.future();

  return {
    id,
    name,
    startDate,
    endDate,
  };
}

createRecords(League, 1, generateLeague);
