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

module.exports = router;
