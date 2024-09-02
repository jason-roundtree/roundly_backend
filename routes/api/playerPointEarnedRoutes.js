const router = require("express").Router();
const { PlayerPointEarned, PlayerHole } = require("../../models");

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
