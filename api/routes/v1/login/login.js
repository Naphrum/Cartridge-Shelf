const express = require("express");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const db = req.app.get("db");
    console.log("Success!")

    const { email, username, password } = req.body;

    if (!email) {
      next(new Error("you should provide an email"));
    }
    if (!username) {
        next(new Error("you should provide an username"));
      }
    if (!password) {
      next(new Error("you should provide a password"));
    }

    const [user] = await db.get_user_by_credentials({ email, username, password });
    console.log(user)

    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
