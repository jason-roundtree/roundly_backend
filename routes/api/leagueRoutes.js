const router = require("express").Router();
const { League } = require("../../models");

router.get("/", async (req, res) => {
  console.log("get all leages route");
  try {
    const data = await League.findAll();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  console.log("get league by id route");
  try {
    const data = await League.findByPk(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    console.log("get league by id err: ", err);
    res.status(500).json(err);
  }
});

// createLeague

// updateLeague

// deleteLeague

// getAllLeagues

module.exports = router;
