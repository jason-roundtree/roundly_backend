const router = require("express").Router();
const { Round } = require("../../models");

router.get("/", async (req, res) => {
  console.log("get all Rounds route");
  try {
    const data = await Round.findAll();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
