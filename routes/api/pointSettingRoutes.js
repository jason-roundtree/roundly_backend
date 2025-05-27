const router = require("express").Router();
const {
  PointSetting,
  League,
  Round,
  RoundPointSetting,
} = require("../../models");

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

// TODO: DRYify with playeNameExistsInLeague into middleware?
async function pointSettingExistsInLeague(name, leagueId) {
  try {
    const existsInLeague = await PointSetting.findOne({
      where: { name: name, league_id: leagueId },
    });
    console.log("pointSettingExistsInLeague pointSetting", existsInLeague);
    return existsInLeague ? true : false;
  } catch (err) {
    console.log("pointSettingExistsInLeague err: ", err);
  }
}

// TODO: move to RoundPointSetting
async function pointSettingExistsInRound(name, roundId) {
  try {
    const existsInRound = await PointSetting.findOne({
      where: { name: name },
      include: [
        {
          model: Round,
          as: "pointSettings",
          where: { id: roundId },
        },
      ],
    });
    console.log("XCXCXCXCDCDFC pointSettingExistsInRound", existsInRound);
    return existsInRound ? true : false;
  } catch (err) {
    console.log("pointSettingExistsInRound err: ", err);
  }
}

router.post("/:leagueId", async (req, res) => {
  console.log("create PointSetting req.body: ", req.body);
  const newPointName = req.body.name;
  const { roundId } = req.query;
  if (req.body.isLeagueSetting) {
    const existsInLeague = await pointSettingExistsInLeague(
      newPointName,
      req.params.leagueId
    );
    if (existsInLeague) {
      return res
        .status(409)
        .json({ message: "Point name already exists in league" });
    }
  } else {
    const existsInRound = await pointSettingExistsInRound(
      newPointName,
      roundId
    );
    console.log("GHHHGHGG existsInRound", existsInRound);
    if (existsInRound) {
      return res
        .status(409)
        .json({ message: "Point name already exists in round" });
    }
  }

  const newPointSetting = {
    ...req.body,
    leagueId: req.params.leagueId,
  };
  try {
    const data = await PointSetting.create(newPointSetting);
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
