const { faker } = require("@faker-js/faker");
const User = require("../models/User");
const createRecords = require("./index");

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

createRecords(User, 4, generateUser);
