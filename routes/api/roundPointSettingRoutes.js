const router = require("express").Router();
const { RoundPointSetting } = require("../../models");

router.post("/", async (req, res) => {
  console.log("*&^ create RoundPointSetting req.body *&^: ", req.body);
  try {
    const data = await RoundPointSetting.create(req.body);
    res.status(200).json(data);
  } catch (err) {
    console.log("create RoundPointSetting by id err: ", err);
    res.status(400).json(err);
  }
});

router.delete("/", async (req, res) => {
  try {
    const data = await RoundPointSetting.destroy({
      where: {
        roundId: req.body.roundId,
        pointSettingId: req.body.pointSettingId,
      },
    });
    res.status(200).json(data);
  } catch (err) {
    console.log("delete RoundPointSetting err: ", err);
    res.status(500).json(err);
  }
});

module.exports = router;
