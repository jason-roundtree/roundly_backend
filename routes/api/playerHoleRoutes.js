const router = require("express").Router();
const { PlayerHole } = require("../../models");

module.exports = router;

router.post("/", async (req, res) => {
  console.log("find or create PlayerHole req.body: ", req.body);
  const { playerId, roundId, hole } = req.body;
  const whereValues = {
    playerId,
    roundId,
    hole,
  };
  try {
    const data = await PlayerHole.findOrCreate({
      where: whereValues,
      default: req.body,
    });
    res.status(200).json(data);
  } catch (err) {
    console.log("create PlayerHole err: ", err);
    res.status(400).json(err);
  }
});

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
