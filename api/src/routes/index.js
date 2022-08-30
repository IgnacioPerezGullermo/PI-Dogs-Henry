const { Router } = require('express');
const router = Router();
const dogRouter = require('./routers/dogs');
const temperamentRouter = require('./routers/temperament');
// Configuracion de los routers
// Router para Perros
router.use('/dogs', dogRouter);
// Router para temperamentos
router.use('/temps', temperamentRouter);

module.exports = router;
