const express = require("express");
const routes = require("./routes");
const massive = require("massive");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();

axios
  .post(
    `https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`
  )
  .then((res) => {
    console.log(res.data);
    app.set('twitch_Token',res.data)
  });

const { CONNECTION_STRING } = process.env;

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes)

app.use((req, res, next) => {
  console.log('REQUEST', req.method, req.url)
  next();
});

massive(CONNECTION_STRING).then((connection) => {
  app.set("db", connection);
  app.listen(4001, () => console.log("Express app started on port 4001"));
});
