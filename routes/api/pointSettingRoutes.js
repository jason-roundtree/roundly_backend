const router = require("express").Router();
const {
  PointSetting,
  League,
  Round,
  RoundPointSetting,
} = require("../../models");

// // TODO: DRYify with playeNameExistsInLeague into middleware?
// async function pointSettingExistsInLeague(name, leagueId) {
//   try {
//     const existsInLeague = await PointSetting.findOne({
//       where: { name: name, league_id: leagueId },
//     });
//     console.log("pointSettingExistsInLeague pointSetting", existsInLeague);
//     return existsInLeague ? true : false;
//   } catch (err) {
//     console.log("pointSettingExistsInLeague err: ", err);
//   }
// }

// async function pointSettingExistsInRound(name, roundId) {
//   try {
//     const existsInRound = await PointSetting.findOne({
//       where: { name: name },
//       include: [
//         {
//           model: Round,
//           as: "pointSettings",
//           where: { id: roundId },
//         },
//       ],
//     });
//     console.log("XCXCXCXCDCDFC pointSettingExistsInRound", existsInRound);
//     return existsInRound ? true : false;
//   } catch (err) {
//     console.log("pointSettingExistsInRound err: ", err);
//   }
// }

// Check if a PointSetting exists in a league (value/scope optional)
router.get("/league-check", async (req, res) => {
  const { name, value, scope, leagueId } = req.query;
  try {
    if (!name || !leagueId) {
      return res
        .status(400)
        .json({ message: "name and leagueId are required" });
    }
    const pointSettingWhere = {
      name,
      isLeagueSetting: true,
      league_id: leagueId,
    };
    if (value !== undefined) pointSettingWhere.value = +value;
    if (scope !== undefined) pointSettingWhere.scope = scope;
    const data = await PointSetting.findOne({ where: pointSettingWhere });
    if (data) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (err) {
    console.log("check PointSetting in league err: ", err);
    res.status(500).json(err);
  }
});

// Check if a PointSetting exists in a round (value/scope optional)
router.get("/round-check", async (req, res) => {
  const { name, value, scope, roundId } = req.query;
  console.log("round-check req.query", req.query);
  try {
    if (!name || !roundId) {
      return res.status(400).json({ message: "name and roundId are required" });
    }
    const pointSettingWhere = { name, isLeagueSetting: false };
    if (value !== undefined) pointSettingWhere.value = +value;
    if (scope !== undefined) pointSettingWhere.scope = scope;
    const data = await PointSetting.findOne({
      where: { name: name },
      include: [
        {
          model: Round,
          as: "pointSettings",
          where: { id: roundId },
        },
      ],
    });
    if (data) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (err) {
    console.log("check PointSetting in round err: ", err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  console.log("get PointSetting by id route");
  try {
    const data = await PointSetting.findByPk(req.params.id);
    console.log("data: ", data);
    if (!data) {
      res.status(404).json({ message: "No matching point setting" });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    console.log("get PointSetting by id err: ", err);
    res.status(500).json(err);
  }
});

router.post("/create-round-point", async (req, res) => {
  console.log("*&^ create RoundPointSetting req.body *&^: ", req.body);
  try {
    const data = await RoundPointSetting.create(req.body);
    res.status(200).json(data);
  } catch (err) {
    console.log("create RoundPointSetting by id err: ", err);
    res.status(400).json(err);
  }
});

router.delete("/round", async (req, res) => {
  try {
    const data = await RoundPointSetting.destroy({
      where: {
        roundId: req.body.roundId,
        pointSettingId: req.body.pointSettingId,
      },
    });
    res.status(200).json(data);
  } catch (err) {
    console.log("delete RoundPointSetting err: ", err);
    res.status(500).json(err);
  }
});

router.post("/create-league-point", async (req, res) => {
  console.log("create PointSetting req.body: ", req.body);
  try {
    const data = await PointSetting.create(req.body);
    res.status(200).json(data);
  } catch (err) {
    console.log("create PointSetting err: ", err);
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await PointSetting.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(data);
  } catch (err) {
    console.log("delete PointSetting err: ", err);
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const [affectedRows] = await PointSetting.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(204).end();
  } catch (err) {
    console.log("update PointSetting err: ", err);
    res.status(500).json(err);
  }
});

module.exports = router;
