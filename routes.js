// routes.js
const express = require('express');
const router = express.Router();
const profilesRouter = require('./api/profiles/index');

// Mount profiles routes under /profiles
router.use('/profiles', profilesRouter);

module.exports = router;