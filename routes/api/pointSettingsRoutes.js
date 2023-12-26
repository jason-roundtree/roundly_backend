const router = require("express").Router();
const { PointSetting } = require("../../models");

router.get("/league/:leagueId", async (req, res) => {
  console.log("get all PointSettings by league route");
  try {
    const data = await PointSetting.findAll({
      where: {
        leagueId: req.params.leagueId,
        isLeagueSetting: true,
      },
    });
    console.log("data: ", data);
    res.status(200).json(data);
  } catch (err) {
    console.log("get all PointSettings by league id err: ", err);
    res.status(500).json(err);
  }
});

router.get("/round/:roundId", async (req, res) => {
  console.log("get PointSettings by round route");
  try {
    const data = await PointSetting.findAll({
      where: {
        roundId: req.params.roundId,
      },
    });
    console.log("data: ", data);
    res.status(200).json(data);
  } catch (err) {
    console.log("get PointSettings by round id err: ", err);
    res.status(500).json(err);
  }
});

module.exports = router;
