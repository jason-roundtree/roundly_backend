const router = require("express").Router();
const { User, League } = require("../../models");

router.get("/", async (req, res) => {
  console.log("get all users route");
  try {
    const data = await User.findAll({ include: League });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  console.log("get user by id route");
  try {
    const data = await User.findByPk(req.params.id);
    if (!data) {
      res.status(404).json({ message: "No matching user" });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    console.log("get league by id err: ", err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  console.log("create user req.body: ", req.body);
  try {
    const data = await User.create(req.body);
    res.status(200).json(data);
  } catch (err) {
    console.log("create user by id err: ", err);
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(data);
  } catch (err) {
    console.log("delete user err: ", err);
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const [affectedRows] = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(204).end();
  } catch (err) {
    console.log("update user err: ", err);
    res.status(500).json(err);
  }
});

module.exports = router;
