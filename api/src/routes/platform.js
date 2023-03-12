const { Router } = require('express');
const { getPlatforms } = require('../controllers/controllersPlatforms');
const platformRouter = Router();

platformRouter.get('/', async (req, res) => {
    const apiPlatforms = await getPlatforms()
    console.log(apiPlatforms)
    res.send(apiPlatforms)
})

module.exports = platformRouter;