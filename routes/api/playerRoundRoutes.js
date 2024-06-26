const router = require("express").Router();
const { PlayerRound } = require("../../models");

router.post("/", async (req, res) => {
  console.log("create PlayerRound req.body: ", req.body);
  try {
    const data = await PlayerRound.create(req.body);
    res.status(200).json(data);
  } catch (err) {
    console.log("create PlayerRound by id err: ", err);
    res.status(400).json(err);
  }
});

router.delete("/", async (req, res) => {
  console.log("delete PlayerRound req.body: ", req.body);
  try {
    const data = await PlayerRound.destroy({
      where: {
        playerId: req.body.playerId,
        roundId: req.body.roundId,
      },
    });
    res.status(200).json(data);
  } catch (err) {
    console.log("delete PlayerRound err: ", err);
    res.status(500).json(err);
  }
});

// TODO: when adding PUT route for updating PlayerRound with player score or points (if you end up using these) do I need to update with composite key as ID??

module.exports = router;
