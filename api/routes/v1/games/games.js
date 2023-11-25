const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

router.get("/", async (req, res, next) => {
  const token = req.app.get("twitch_Token");
  const result = await axios.post(
    "https://api.igdb.com/v4/games",
    "fields checksum,created_at,name,slug,updated_at,url; limit 25;",
    {
      headers: {
        "Client-ID": process.env.CLIENT_ID,
        Authorization: `Bearer ${token.access_token}`,
      },
    }
  );
  res.json(result.data);
});

module.exports = router;
