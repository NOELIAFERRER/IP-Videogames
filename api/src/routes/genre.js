const { Router } = require('express');
const { getGenres } = require('./controllersGenre');
const genreRouter = Router();

genreRouter.get('/', async (req, res) => {
    const apiGenres = await getGenres()
    console.log(apiGenres)
    res.send(apiGenres)
})

module.exports = genreRouter;