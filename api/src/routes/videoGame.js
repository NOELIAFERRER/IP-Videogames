const { Router } = require('express');
const { getAllGames,
  getApiGamesByName,
  getGamesByName,
  getDbGamesByName,
  getApiGameById,
  getDbGames,
  addGame
} = require('../controllers/controllersVideoGame');

const videogameRouter = Router();

videogameRouter.get('/', async (req, res) => {
   try {
    const { name } = req.query;
    if(!name) 
    {
    const allGames = await getAllGames()
    console.log(allGames)
    return res.status(201).json(allGames)  
    } else {
    const gamesByName = await getGamesByName(name)
    console.log(gamesByName)  
     return res.status(201).json(gamesByName)
   } 
  }catch (error) {
    return res.status(404).send('No existen videojuegos con el nombre consultado')
  }
})


videogameRouter.get('/:id', async (req, res) => {
 
  try {
  const { id } = req.params   
  // if(!id) return res.status(404).send('error')
  //   else {
      const gameById = await (getApiGameById(id))
      console.log(gameById)
      res.json(gameById)     
       
    }
   catch (error) {
    res.send('No existen videojuegos con el id consultado')
  }
})


videogameRouter.post('/', async (req, res) => {
  try {
    const { image, name, description, released, rating, genres, platforms } = req.body;
    if (!name || !description || !released || !rating) {
      return res.status(404).send('Datos enviados con error')
    }
    const newGame = await addGame(image, name, description, released, rating, genres, platforms);
    return res.status(201).json(newGame)
  }
  catch (error) {
    return res.status(404).send(error.message)
  }
})

module.exports = videogameRouter;