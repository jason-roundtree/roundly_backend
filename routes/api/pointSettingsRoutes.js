const router = require("express").Router();
const { PointSetting } = require("../../models");

router.get("/:leagueId", async (req, res) => {
  console.log("get all PointSettings by league route");
  try {
    const data = await PointSetting.findAll({
      where: {
        leagueId: req.params.leagueId,
      },
    });
    console.log("data: ", data);
    res.status(200).json(data);
  } catch (err) {
    console.log("get all PointSettings by league id err: ", err);
    res.status(500).json(err);
  }
});

module.exports = router;
