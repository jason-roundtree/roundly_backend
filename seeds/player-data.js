const { faker } = require("@faker-js/faker");
const { Player, User } = require("../models");
const createRecords = require("./index");

function generatePlayer() {
  const id = faker.string.uuid();
  const name = faker.lorem.words({ min: 1, max: 2 });

  return {
    id,
    name,
  };
}

const users = async () => await User.findAll();
// console.log("users: ", JSON.stringify(users, null, 2));

// createRecords(Player, 9, generatePlayer);
