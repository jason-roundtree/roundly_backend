const router = require("express").Router();
const { Player, Round } = require("../../models");

// TODO: change how this route is structured? I.e. add separate league-player routes?
router.get("/league/:id", async (req, res) => {
  console.log("get all Players by league route");
  try {
    const data = await Player.findAll({
      where: {
        leagueId: req.params.id,
      },
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  console.log("get Player by id route");
  try {
    const data = await Player.findByPk(req.params.id, {
      include: {
        model: Round,
        attributes: ["id", "name", "date"],
        through: {
          attributes: [
            /* list the wanted attributes here */
          ],
        },
      },
    });
    console.log("data: ", data);
    if (!data) {
      res.status(404).json({ message: "No matching player" });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    console.log("get Player by id err: ", err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  console.log("create Player req.body: ", req.body);
  try {
    const data = await Player.create(req.body);
    res.status(200).json(data);
  } catch (err) {
    console.log("create Player err: ", err);
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await Player.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(data);
  } catch (err) {
    console.log("delete Player err: ", err);
    res.status(500).json(err);
  }
});

// router.put("/", async (req, res) => {
//   try {
//     const [affectedRows] = await Player.update(req.body);
//     res.status(204).end();
//   } catch (err) {
//     console.log("update Players err: ", err);
//     res.status(500).json(err);
//   }
// });

router.put("/:id", async (req, res) => {
  try {
    const [affectedRows] = await Player.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(204).end();
  } catch (err) {
    console.log("update Player err: ", err);
    res.status(500).json(err);
  }
});

module.exports = router;
