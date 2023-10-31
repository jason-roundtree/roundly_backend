const router = require("express").Router();
const leagueRoutes = require("./leagueRoutes");
const userRoutes = require("./userRoutes");
const userLeagueRoutes = require("./userLeagueRoutes");

router.use("/leagues", leagueRoutes);
router.use("/users", userRoutes);
router.use("/user-league", userLeagueRoutes);

module.exports = router;
