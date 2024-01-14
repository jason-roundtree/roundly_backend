const router = require("express").Router();
const { Round } = require("../../models");

router.get("/:leagueId", async (req, res) => {
  console.log("get all league Rounds route");
  try {
    const data = await Round.findAll({
      where: {
        leagueId: req.params.leagueId,
      },
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
