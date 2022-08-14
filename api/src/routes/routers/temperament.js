const express = require('express');

const { getTemps } = require('../../controllers/temps');

const router = express.Router();

router.get('/', getTemps);

module.exports = router;
