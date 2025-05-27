const router = require("express").Router();
const {
  PlayerPointEarned,
  Player,
  PlayerHole,
  PointSetting,
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

router.put("/:id", async (req, res) => {
  console.log("update PlayerPointEarned req.params.id: ", req.params.id);
  try {
    const [affectedRows] = await PlayerPointEarned.update(req.body, {
      where: { id: req.params.id },
      include: [{ model: PlayerHole, where: { hole: req.body } }],
    });
    res.status(204).end();
  } catch (err) {
    console.log("update PlayerPointEarned err: ", err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  console.log("delete PlayerPointEarned req.params.id: ", req.params.id);
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

// GET check if player earned specific point on a hole
router.get("/hole-point-earned", async (req, res) => {
  console.log("--> GET check if player earned specific point on a hole");
  console.log("hole-point-earned", req.query);
  try {
    // TODO: change to findOne
    const data = await PlayerPointEarned.findAll({
      where: {
        playerId: req.query.playerId,
        roundId: req.query.roundId,
        pointSettingId: req.query.pointSettingId,
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
        { model: Player, attributes: ["name"] },
        { model: PlayerHole, where: { hole: req.query.hole } },
      ],
    });
    console.log("specific PlayerPointEarned by hole data: ", data);
    // TODO: is 204 ok to use and is 404 needed?
    if (!data.length) {
      res
        .status(204)
        .json({ message: "Point not earned by player on this hole" });
      return;
    }
    if (!data) {
      res.status(404);
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    console.log("specific PlayerPointEarned by hole err: ", err);
    res.status(500).json(err);
  }
});

// GET check if player earned specific point in a round
router.get("/round-point-earned", async (req, res) => {
  console.log("round-point-earned", req.query);
  try {
    const data = await PlayerPointEarned.findOne({
      where: {
        playerId: req.query.playerId,
        roundId: req.query.roundId,
        pointSettingId: req.query.pointSettingId,
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
        { model: Player, attributes: ["name"] },
        { model: PlayerHole },
      ],
    });
    console.log("XYZ specific PlayerPointEarned by round data: ", data);
    if (data) {
      res.status(200).json(data);
    } else {
      res
        // TODO: is 204 ok to use instead of 404?
        .status(204)
        .json({ message: "Point not earned by player in this round" });
    }
  } catch (err) {
    console.log("specific PlayerPointEarned by round err: ", err);
    res.status(500).json(err);
  }
});
