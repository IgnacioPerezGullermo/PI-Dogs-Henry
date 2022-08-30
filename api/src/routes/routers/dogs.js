const express = require('express');
const { getAll, getDogId, postDog } = require('../../controllers/dogs');

const router = express.Router();
//Creo la ruta con la funcion necesaria
router.get('/', getAll);
//Creo la ruta con la funcion necesaria
router.get('/:id', getDogId);
//Creo la ruta con la funcion necesaria
router.post('/', postDog);

module.exports = router;
