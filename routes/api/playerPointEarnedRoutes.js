const router = require("express").Router();
const sequelize = require("../../db_connection");
const { QueryTypes } = require("sequelize");
const {
  PlayerPointEarned,
  PointSetting,
  Player,
  Round,
} = require("../../models");

module.exports = router;

// TODO: add /player/playerId?
router.post("/", async (req, res) => {
  console.log("create PlayerPointEarned req.body: ", req.body);
  try {
    const data = await PlayerPointEarned.create(req.body);
    res.status(200).json(data);
  } catch (err) {
    console.log("create PlayerPointEarned err: ", err);
    res.status(400).json(err);
  }
});

// GET individual points earned by player in round
router.get("/player/:playerId/round/:roundId", async (req, res) => {
  console.log("get PlayerPointEarned by round");
  try {
    const data = await PlayerPointEarned.findAll({
      where: {
        playerId: req.params.playerId,
        roundId: req.params.roundId,
      },
      include: [
        {
          model: PointSetting,
          //   attributes: [
          //     "id",
          //     "name",
          //     "value",
          //     "scope",
          //     "isLeagueSetting",
          //     "maxFrequencyPerScope",
          //   ],
        },
        { model: Player, attributes: ["name"] },
      ],
    });
    console.log("PlayerPointEarned by round data: ", data);
    // TODO: should this only check for !data.length? Are there other routes made where I should be checking for empty array?
    if (!data || !data.length) {
      res
        .status(404)
        .json({ message: "No matching player round points found" });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    console.log("get PlayerPointEarned by round err: ", err);
    res.status(500).json(err);
  }
});

// GET total points earned by player in round
router.get(
  "/player/:playerId/round/:roundId/total-points",
  async (req, res) => {
    console.log("get sum of PlayerPointEarned by round");
    const q = `
        select 
            player.name as player_name,
            player.id as player_id,
            sum(ps.value * ppe.frequency) as point_sum
        from player_point_earned ppe
        join point_setting ps 
            on ppe.point_setting_id = ps.id
        join player
            on ppe.player_id = player.id
        join round
            on ppe.round_id = round.id
        where 
            round.id = ?
            and
            player.id = ?
        group by  
            player.id,
            player.name;
    `;
    try {
      const data = await sequelize.query(q, {
        replacements: [req.params.roundId, req.params.playerId],
        type: QueryTypes.SELECT,
      });
      console.log("sum of PlayerPointEarned by round data: ", data);

      if (!data || !data.length) {
        res
          .status(404)
          .json({ message: "No matching player round points found" });
        return;
      }
      res.status(200).json(data);
    } catch (err) {
      console.log("get PlayerPointEarned by round err: ", err);
      res.status(500).json(err);
    }
  }
);

router.delete("/:id", async (req, res) => {
  console.log("delete PlayerPointEarned req.body: ", req.body);
  try {
    const data = await PlayerPointEarned.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json(data);
  } catch (err) {
    console.log("delete PlayerPointEarned err: ", err);
    res.status(500).json(err);
  }
});
