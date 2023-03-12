const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videoGameRouter = require('./videoGame');
const genreRouter = require('./genre');
const platformRouter = require('./platform')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', videoGameRouter);
router.use('/genres', genreRouter);
router.use('/platforms', platformRouter);

//PRUEBA PARA ENVIAR EMAIL
// router.use('/email', emailRouter);


module.exports = router;
