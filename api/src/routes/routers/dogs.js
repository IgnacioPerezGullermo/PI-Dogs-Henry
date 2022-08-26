const express = require('express');

const { getAll, getDogId, postDog } = require('../../controllers/dogs');

const router = express.Router();

router.get('/', getAll);

//router.get('/:name', getDog);

router.get('/:id', getDogId);

router.post('/', postDog);
module.exports = router;
