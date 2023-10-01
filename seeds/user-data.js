const { faker } = require("@faker-js/faker");

function generateUser() {
  const id = faker.string.uuid();
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = (firstName[0] + lastName + "@email.com").toLowerCase();
  const username = faker.internet.userName();

  return {
    id,
    firstName,
    lastName,
    email,
    username,
  };
}

module.exports = generateUser;
