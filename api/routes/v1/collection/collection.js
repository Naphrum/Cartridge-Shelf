const express = require("express");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const db = req.app.get("db");

    const { user_id, game_id } = req.body;

    const collection = await db.collection.insert({ user_id, game_id });

    res.json(collection);
  } catch (err) {
    next(err);
  }
});

// router.delete("/:id", async (req, res, next) => {
//   try {
//     const db = req.app.get("db");
//     const { id } = req.params;

//     await db.games.destroy(id);
//     // kill orphans
//     await db.games.destroy({ game_id: id });

//     res.sendStatus(200);
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
