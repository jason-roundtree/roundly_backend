const router = require("express").Router();
const { UserLeague } = require("../../models");

router.post("/", async (req, res) => {
  console.log("create UserLeague req.body: ", req.body);
  try {
    const data = await UserLeague.create(req.body);
    res.status(200).json(data);
  } catch (err) {
    console.log("create UserLeague by id err: ", err);
    res.status(400).json(err);
  }
});

module.exports = router;
