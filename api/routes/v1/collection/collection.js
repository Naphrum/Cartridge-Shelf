const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

router.get("/", async (req, res, next) => {

})

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

router.delete("/:id", async (req, res, next) => {
  try {
    const db = req.app.get("db");
    const { id } = req.params;
    await db.collection.destroy(id);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
