const router = require("express").Router();
const { Player } = require("../../models");

router.get("/:leagueId", async (req, res) => {
  console.log("get all Players by league route");
  try {
    const data = await Player.findAll({
      where: {
        leagueId: req.params.leagueId,
      },
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.post("/", async (req, res) => {
//   console.log("create Players req.body: ", req.body);
//   try {
//     const data = await Player.create(req.body);
//     res.status(200).json(data);
//   } catch (err) {
//     console.log("create Players err: ", err);
//     res.status(400).json(err);
//   }
// });

// router.delete("/", async (req, res) => {
//   try {
//     const data = await Player.destroy();
//     res.status(200).json(data);
//   } catch (err) {
//     console.log("delete Players err: ", err);
//     res.status(500).json(err);
//   }
// });

module.exports = router;
