const router = require("express").Router();
const leagueRoutes = require("./leagueRoutes");

router.use("/leagues", leagueRoutes);

module.exports = router;
