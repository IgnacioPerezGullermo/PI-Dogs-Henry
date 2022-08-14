const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
//const { Dog } = require('../models');
const router = Router();
const dogRouter = require('./routers/dogs');
const temperamentRouter = require('./routers/temperament');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogRouter);

router.use('/temps', temperamentRouter);

module.exports = router;
