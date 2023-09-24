const express = require("express");
const sequelize = require("./db_connection");
// const {
//   User,
//   League,
//   UserLeague,
//   Player,
//   PlayerHole,
//   PlayerPointEarned,
//   PlayerRound,
//   PointSetting,
//   Round,
//   RoundGroup,
// } = require("./models");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize
  .sync({ force: true })
  .then(() => {
    app.listen(PORT, () => console.log("Now listening"));
  })
  .catch((err) => console.log("Error: ", err));
