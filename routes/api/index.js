const router = require("express").Router();

const leagueRoutes = require("./leagueRoutes");
const userRoutes = require("./userRoutes");
const userLeagueRoutes = require("./userLeagueRoutes");
const playerRoutes = require("./playerRoutes");
const playersRoutes = require("./playersRoutes");
const roundRoutes = require("./roundRoutes");
const roundsRoutes = require("./roundsRoutes");
const playerRoundRoutes = require("./playerRoundRoutes");
const pointSettingRoutes = require("./pointSettingRoutes");
const pointSettingsRoutes = require("./pointSettingsRoutes");
const roundPointSettingRoutes = require("./roundPointSettingRoutes");

router.use("/league", leagueRoutes);
router.use("/user", userRoutes);
router.use("/user-leagues", userLeagueRoutes);
router.use("/player", playerRoutes);
router.use("/players", playersRoutes);
// router.use("/league-players", leaguePlayerRoutes);
router.use("/round", roundRoutes);
router.use("/rounds", roundsRoutes);
router.use("/player-round", playerRoundRoutes);
router.use("/point-setting", pointSettingRoutes);
router.use("/point-settings", pointSettingsRoutes);
router.use("/round-point-setting", roundPointSettingRoutes);

module.exports = router;
