const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videoGameRouter = require('./videoGame');
const genreRouter = require('./genre');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', videoGameRouter);
router.use('/genres', genreRouter);


module.exports = router;
