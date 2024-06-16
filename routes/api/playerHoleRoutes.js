const router = require("express").Router();
const { PlayerHole } = require("../../models");

module.exports = router;

router.post("/", async (req, res) => {
  console.log("create PlayerHole req.body: ", req.body);
  try {
    const data = await PlayerHole.create(req.body);
    res.status(200).json(data);
  } catch (err) {
    console.log("create PlayerHole err: ", err);
    res.status(400).json(err);
  }
});
