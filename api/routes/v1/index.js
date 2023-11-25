const express = require("express");
const login = require('./login');
const users = require('./users');
const games = require('./games');
const collection = require('./collection');

const router = express.Router();

router.use('/login', login);
router.use('/users', users);
router.use('/games', games);
router.use('/collection', collection);

module.exports = router;