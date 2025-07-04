const router = require("express").Router();
const sequelize = require("../../db_connection");
const { QueryTypes } = require("sequelize");
const {
  PlayerPointEarned,
  PointSetting,
  Player,
  PlayerHole,
} = require("../../models");

module.exports = router;

// GET player points earned in round
router.get("/player/:playerId/round/:roundId", async (req, res) => {
  console.log("--> GET player round points earned");
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
        { model: PlayerHole },
      ],
    });
    console.log("PlayerPointEarned by round data: ", data);
    // TODO: is 204 ok to use and is 404 needed?
    if (!data.length) {
      res.status(204).json({
        message: "No player round points found",
        noPlayerPointsEarned: true,
      });
      return;
    }
    if (!data) {
      res.status(404).json({ message: "uhhh, something else happened" });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    console.log("get PlayerPointEarned by round err A: ", err);
    res.status(500).json(err);
  }
});

// GET player round points earned by point type
router.get(
  "/player/:playerId/round/:roundId/point/:pointSettingId",
  async (req, res) => {
    console.log("--> GET player round points earned by point type");
    try {
      const data = await PlayerPointEarned.findAll({
        where: {
          playerId: req.params.playerId,
          roundId: req.params.roundId,
          pointSettingId: req.params.pointSettingId,
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
          { model: PlayerHole },
        ],
      });
      console.log("PlayerPointEarned by point type data: ", data);
      // TODO: should this only check for !data.length? Are there other routes made where I should be checking for empty array?
      if (!data || !data.length) {
        res
          .status(404)
          .json({ message: "No matching player round points found" });
        return;
      }
      res.status(200).json(data);
    } catch (err) {
      console.log("PlayerPointEarned by point type err: ", err);
      res.status(500).json(err);
    }
  }
);

// GET player points earned in hole
router.get(
  "/player/:playerId/round/:roundId/hole/:holeNumber",
  async (req, res) => {
    console.log("--> GET player round points earned by hole");
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
          { model: PlayerHole, where: { hole: req.params.holeNumber } },
        ],
      });
      console.log("PlayerPointEarned by hole data: ", data);
      // TODO: is 204 ok to use and is 404 needed?
      if (!data.length) {
        res.status(204).json({ message: "No player round points found" });
        return;
      }
      if (!data) {
        res.status(404).json({ message: "uhhh, something else happened" });
        return;
      }
      res.status(200).json(data);
    } catch (err) {
      console.log("get PlayerPointEarned by round err B: ", err);
      res.status(500).json(err);
    }
  }
);

// GET total points earned by player in ROUND
router.get(
  "/player/:playerId/round/:roundId/total-points",
  async (req, res) => {
    console.log("--> GET total points earned by player in round");
    const q = `
        select 
            player.name as player_name,
            player.id as player_id,
             sum(ps.value * ppe.quantity)::FLOAT as total_points
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
      // TODO: is 204 ok to use and is 404 needed?
      if (!data.length) {
        res.status(204).json({ message: "No player round points found" });
        return;
      }
      if (!data) {
        res.status(404).json({ message: "uhhh, something else happened" });
        return;
      }
      // TODO: should total points get cast as number somewhere?
      res.status(200).json(data[0]);
    } catch (err) {
      console.log("get PlayerPointEarned by round err C: ", err);
      res.status(500).json(err);
    }
  }
);

// GET total points earned by player in LEAGUE
router.get(
  "/player/:playerId/league/:leagueId/total-points",
  async (req, res) => {
    const q = `
        select 
            player.name as player_name,
            player.id as player_id,
            sum(ps.value * ppe.quantity)::FLOAT as total_points
        from player_point_earned ppe
        join point_setting ps 
            on ppe.point_setting_id = ps.id
        join player
            on ppe.player_id = player.id
        join league
            on league.id = player.league_id
        where 
            league.id = ?
            and
            player.id = ?
        group by  
            player.id,
            player.name;
    `;
    try {
      const data = await sequelize.query(q, {
        replacements: [req.params.leagueId, req.params.playerId],
        type: QueryTypes.SELECT,
      });
      console.log("sum of PlayerPointEarned by league data: ", data);
      // TODO: is 204 ok to use and is 404 needed?
      if (!data.length) {
        res.status(204).json({ message: "No player league points found" });
        return;
      }
      if (!data) {
        res.status(404).json({ message: "uhhh, something else happened" });
        return;
      }
      // TODO: should total points get cast as number somewhere?
      res.status(200).json(data[0]);
    } catch (err) {
      console.log("get PlayerPointEarned by league err: ", err);
      res.status(500).json(err);
    }
  }
);
