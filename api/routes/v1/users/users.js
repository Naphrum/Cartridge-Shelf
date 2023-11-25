const express = require("express");

const router = express.Router();

router.get("/:id/collection", async (req, res, next) => {
  try {
    const db = req.app.get("db");

    const { id } = req.params;

    const collection = await db.get_collection_by_user_id({ id });

    res.json(collection);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
