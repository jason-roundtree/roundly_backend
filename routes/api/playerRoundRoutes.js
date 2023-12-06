const router = require("express").Router();
const { PlayerRound } = require("../../models");

// TODO: does it matter if this is POST, PUT, PATCH and that it handles create and update?
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

module.exports = router;
