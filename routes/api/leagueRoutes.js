const router = require("express").Router();
const { League } = require("../../models");

// router.get("/", async (req, res) => {
//   console.log("get all leages route");
//   try {
//     const data = await League.findAll();
//     res.status(200).json(data);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/:id", async (req, res) => {
  console.log("get league by id route");
  try {
    const data = await League.findByPk(req.params.id);
    if (!data) {
      res.status(404).json({ message: "No matching league" });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    console.log("get league by id err: ", err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  console.log("create League req.body: ", req.body);
  try {
    const data = await League.create(req.body);
    res.status(200).json(data);
  } catch (err) {
    console.log("create League by id err: ", err);
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await League.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(data);
  } catch (err) {
    console.log("delete League err: ", err);
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const [affectedRows] = await League.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(204).end();
  } catch (err) {
    console.log("update League err: ", err);
    res.status(500).json(err);
  }
});

module.exports = router;
