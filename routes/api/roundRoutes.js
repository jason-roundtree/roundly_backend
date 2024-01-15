const router = require("express").Router();
const { Round, Player } = require("../../models");

router.post("/", async (req, res) => {
  console.log("create Round req.body: ", req.body);
  const newRound = {
    ...req.body,
  };
  try {
    const data = await Round.create(newRound);
    res.status(200).json(data);
  } catch (err) {
    console.log("create Round by id err: ", err);
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  console.log("get Round by id route");
  try {
    const data = await Round.findByPk(req.params.id, {
      include: {
        model: Player,
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    });
    if (!data) {
      res.status(404).json({ message: "No matching round" });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    console.log("get Round by id err: ", err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await Round.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(data);
  } catch (err) {
    console.log("delete Round err: ", err);
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const [affectedRows] = await Round.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(204).end();
  } catch (err) {
    console.log("update Round err: ", err);
    res.status(500).json(err);
  }
});

module.exports = router;
