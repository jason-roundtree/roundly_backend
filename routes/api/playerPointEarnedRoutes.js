const router = require("express").Router();
// const sequelize = require("../../db_connection");
const { PlayerPointEarned, PointSetting } = require("../../models");

module.exports = router;

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

// GET individual points earned by player in round
router.get("/player/:playerId/round/:roundId", async (req, res) => {
  console.log("get PlayerPointEarned by round");
  try {
    const data = await PlayerPointEarned.findAll({
      //   attributes: {
      //     include: [[sequelize.fn("SUM", sequelize.col("value")), "sum_values"]],
      //   },
      where: {
        playerId: req.params.playerId,
        roundId: req.params.roundId,
      },
      include: [
        {
          model: PointSetting,
          //   attributes: [
          //     "id",
          //     "name",
          //     "value",
          //     "scope",
          //     "isLeagueSetting",
          //     "maxFrequencyPerScope",
          //   ],
        },
      ],
    });
    console.log("PlayerPointEarned by round data: ", data);
    // TODO: should this only check for !data.length? Are there other routes made where I should be checking for empty array instead?
    if (!data || !data.length) {
      res
        .status(404)
        .json({ message: "No matching player round points found" });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    console.log("get PlayerPointEarned by round err: ", err);
    res.status(500).json(err);
  }
});

// TODO:
// GET sum of points earned by player in round
