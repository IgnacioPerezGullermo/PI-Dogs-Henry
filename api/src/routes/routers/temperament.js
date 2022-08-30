const express = require('express');
const { getTemps } = require('../../controllers/temps');

const router = express.Router();
//Creo la ruta con la funcion necesaria
router.get('/', getTemps);

module.exports = router;
