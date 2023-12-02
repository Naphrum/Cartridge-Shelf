const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

router.get("/", async (req, res, next) => {
  const token = req.app.get("twitch_Token");
  const result = await axios.post(
    "https://api.igdb.com/v4/games",
    "fields checksum,created_at,name,cover,slug,updated_at,url; limit 25;",
    {
      headers: {
        "Client-ID": process.env.CLIENT_ID,
        Authorization: `Bearer ${token.access_token}`,
      },
    }
  );


  const coverIdArr = result.data.map((game) => game.cover);
  console.log(coverIdArr);

  const filteredCoverIdArr = coverIdArr.filter((game) => game)

  const covers = await axios.post(
    "https://api.igdb.com/v4/covers",
    `fields url,game,image_id; where id = (${filteredCoverIdArr.join()});`,
    {
      headers: {
        "Client-ID": process.env.CLIENT_ID,
        Authorization: `Bearer ${token.access_token}`,
      },
    }
  );

  console.log(covers)

  covers.data.forEach((cover) => {
    const gameId = cover.game;
    
    const gameIndex = result.data.findIndex((game) => gameId === game.id)
    console.log(gameIndex)

    result.data[gameIndex].coverUrl = `images.igdb.com/igdb/image/upload/t_cover_big/${cover.image_id}.jpg`
  })

  res.json(result.data);
});

module.exports = router;
