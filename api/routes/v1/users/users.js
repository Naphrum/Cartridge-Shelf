const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/:id/collection", async (req, res, next) => {
  const token = req.app.get("twitch_Token");
  console.log(token)
  try {
    const db = req.app.get("db");

    const { id } = req.params;

    const collection = await db.get_collection_by_user_id({ id });

    const gameId = collection.map((game) => {
      return game.game_id
    })

    const games = await axios.post(
      "https://api.igdb.com/v4/games",
      `fields checksum,created_at,name,cover,slug,updated_at,url; where id = (${gameId.join()});`,
      {
        headers: {
          "Client-ID": process.env.CLIENT_ID,
          Authorization: `Bearer ${token.access_token}`,
        },
      }
    )
    
    const coverIdArr = games.data.map((game) => game.cover);
  
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
    
    covers.data.forEach((cover) => {
      const gameId = cover.game;
      
      const gameIndex = games.data.findIndex((game) => gameId === game.id)
      
      games.data[gameIndex].coverUrl = `images.igdb.com/igdb/image/upload/t_cover_big/${cover.image_id}.jpg`
    })
    // console.log("GAMES:  ", games.data)

    games.data.forEach((game) => {
      const gameId = game.id;
      const gameIndex = collection.findIndex((game) => gameId === game.game_id)
      collection[gameIndex].game = game
    })
    
    console.log("COLLECTION:  ", collection)
    res.json(collection);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
