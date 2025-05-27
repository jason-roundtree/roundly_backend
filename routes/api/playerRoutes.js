const router = require("express").Router();
const { Player, Round, League } = require("../../models");

router.get("/:id", async (req, res) => {
  console.log("get Player by id route");
  try {
    const data = await Player.findByPk(req.params.id, {
      include: {
        // TODO: am i using this round data? Should i return round data in a player-round route?
        model: Round,
        attributes: ["id", "name", "date"],
        // prevents PlayerRound from being included
        through: {
          attributes: [],
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

async function playerNameExistsInLeague(name, leagueId) {
  try {
    const user = await Player.findOne({
      where: { name: name, leagueId: leagueId },
      // include: [{ model: League, where: { id: leagueId } }],
    });
    console.log("playerNameExistsInLeague user", user);
    return user ? true : false;
  } catch (err) {
    console.log("playerNameExistsInLeague err: ", err);
  }
}

router.post("/:leagueId", async (req, res) => {
  const playerNameExists = await playerNameExistsInLeague(
    req.body.name,
    req.params.leagueId
  );
  if (playerNameExists) {
    return res.status(409).json({ message: "Player name already exists" });
  }

  console.log("create Player req.body: ", req.body);
  const newPlayer = {
    ...req.body,
    leagueId: req.params.leagueId,
  };
  try {
    const data = await Player.create(newPlayer);
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
