const router = require("express").Router();
const leagueRoutes = require("./leagueRoutes");
const userRoutes = require("./userRoutes");
const userLeagueRoutes = require("./userLeagueRoutes");
const playerRoutes = require("./playerRoutes");
const roundRoutes = require("./roundRoutes");

router.use("/leagues", leagueRoutes);
router.use("/users", userRoutes);
router.use("/user-leagues", userLeagueRoutes);
router.use("/players", playerRoutes);
router.use("/rounds", roundRoutes);

module.exports = router;
