const router = require("express").Router();
const { PointSetting } = require("../../models");

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

router.post("/:leagueId", async (req, res) => {
  console.log("create PointSetting req.body: ", req.body);
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
