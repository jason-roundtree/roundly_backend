const { Op } = require("sequelize");
const router = require("express").Router();
const { PlayerHole } = require("../../models");

module.exports = router;

router.get("/player/:playerId/round/:roundId/hole/:hole", async (req, res) => {
  console.log("get player hole req.params: ", req.params);
  const { playerId, roundId, hole } = req.params;
  try {
    const data = await PlayerHole.findOne({
      where: {
        playerId,
        roundId,
        hole: +hole,
      },
    });
    console.log("get PlayerHole data", data);
    if (data === null) {
      res
        .status(404)
        .json({ message: "No hole found for the requested player and round" });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    console.log("get PlayerHole err: ", err);
    res.status(500).json(err);
  }
});

// NEWNEWNEW POST player hole
// router.post("/xyz/", async (req, res) => {
//   console.log("NEW find or create PlayerHole req.body: ", req.body);
//   const { playerId, roundId, hole } = req.body;
//   const whereClause = {
//     playerId,
//     roundId,
//     hole,
//   };
//   try {
//     const data = await PlayerHole.findOrCreate({
//       where: whereClause,
//       defaults: req.body,
//     });
//     console.log("EEE data EEE", data);
//     res.status(200).json(data);
//   } catch (err) {
//     console.log("create PlayerHole err: ", err);
//     res.status(400).json(err);
//   }
// });

// POST player hole
router.post("/", async (req, res) => {
  console.log("find or create PlayerHole req.body: ", req.body);
  const { playerId, roundId, hole, score } = req.body;
  const whereClause = {
    playerId,
    roundId,
    hole,
  };
  try {
    const data = await PlayerHole.findOrCreate({
      where: whereClause,
      defaults: req.body,
    });
    console.log("EEE data EEE", data);
    res.status(200).json(data);
  } catch (err) {
    console.log("create PlayerHole err: ", err);
    res.status(400).json(err);
  }
});

// PUT player hole
router.put("/:id", async (req, res) => {
  console.log("update PlayerHole req.body: ", req.body);
  try {
    const [affectedRows] = await PlayerHole.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(204).end();
  } catch (err) {
    console.log("update PlayerHole err: ", err);
    res.status(500).json(err);
  }
});

// GET player holes in round
router.get("/player/:playerId/round/:roundId", async (req, res) => {
  const { roundId, playerId } = req.params;
  const { scoreIsNotNull } = req.query;
  console.log("GET player holes in round", {
    roundId,
    playerId,
    scoreIsNotNull,
  });
  try {
    const whereClause = { roundId, playerId };
    if (scoreIsNotNull) {
      whereClause.score = { [Op.not]: null };
    }
    const data = await PlayerHole.findAll({
      where: whereClause,
    });
    // TODO: is 204 ok to use and is 404 needed?
    if (!data.length) {
      res.status(204).json({ message: "No player holes found for round" });
      return;
    }
    if (!data) {
      res.status(404).json({ message: "uhhh, something else happened" });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    console.log("GET player holes in round: ", err);
    res.status(500).json(err);
  }
});

// DELETE player hole
router.delete("/:id", async (req, res) => {
  console.log("delete PlayerHole req.body: ", req.body);
  try {
    const data = await PlayerHole.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json(data);
  } catch (err) {
    console.log("delete PlayerHole err: ", err);
    res.status(500).json(err);
  }
});
