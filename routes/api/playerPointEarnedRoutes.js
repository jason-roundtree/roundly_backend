const router = require("express").Router();
const sequelize = require("../../db_connection");
const { QueryTypes } = require("sequelize");
const {
  PlayerPointEarned,
  PointSetting,
  Player,
  Round,
} = require("../../models");

module.exports = router;

// TODO: add /player/playerId?
router.post("/", async (req, res) => {
  console.log("create PlayerPointEarned req.body: ", req.body);
  try {
    const data = await PlayerPointEarned.create(req.body);
    res.status(200).json(data);
  } catch (err) {
    console.log("create PlayerPointEarned err: ", err);
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  console.log("delete PlayerPointEarned req.body: ", req.body);
  try {
    const data = await PlayerPointEarned.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json(data);
  } catch (err) {
    console.log("delete PlayerPointEarned err: ", err);
    res.status(500).json(err);
  }
});
