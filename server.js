const express = require("express");
const sequelize = require("./db_connection");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");
const {
  User,
  League,
  UserLeague,
  Player,
  PlayerHole,
  PlayerPointEarned,
  PlayerRound,
  PointSetting,
  Round,
  RoundGroup,
  RoundPointSetting,
} = require("./models");

const app = express();
const PORT = process.env.PORT || 3001;

// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

// force sync clear only one model:
// PointSetting.sync({ force: true });
sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(PORT, () => console.log("Now listening"));
  })
  .catch((err) => console.log("Error: ", err));
