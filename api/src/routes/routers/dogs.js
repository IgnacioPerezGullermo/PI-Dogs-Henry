const express = require('express');

const { getAll, getDogId } = require('../../controllers/dogs');

const router = express.Router();

router.get('/', getAll);

//router.get('/:name', getDog);

router.get('/:id', getDogId);

module.exports = router;
