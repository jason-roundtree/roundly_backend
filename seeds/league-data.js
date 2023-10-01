const { faker } = require("@faker-js/faker");

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

module.exports = generateLeague;
