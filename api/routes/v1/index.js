const express = require("express");
const login = require('./login');
const users = require('./users');
const exercises = require('./games');
const workouts = require('./collection');

const router = express.Router();

router.use('/login', login);
router.use('/users', users);
router.use('/games', exercises);
router.use('/collection', workouts);

module.exports = router;