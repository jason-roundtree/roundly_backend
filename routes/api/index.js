const router = require("express").Router();
const leagueRoutes = require("./leagueRoutes");
const userRoutes = require("./userRoutes");
const userLeagueRoutes = require("./userLeagueRoutes");
const playerRoutes = require("./playerRoutes");
// const leaguePlayerRoutes = require("./leaguePlayerRoutes");
const roundRoutes = require("./roundRoutes");
const playerRoundRoutes = require("./playerRoundRoutes");
const pointSettingsRoutes = require("./pointSettingsRoutes");

router.use("/leagues", leagueRoutes);
router.use("/users", userRoutes);
router.use("/user-leagues", userLeagueRoutes);
router.use("/players", playerRoutes);
// router.use("/league-players", leaguePlayerRoutes);
router.use("/rounds", roundRoutes);
router.use("/player-rounds", playerRoundRoutes);
router.use("/point-settings", pointSettingsRoutes);

module.exports = router;
