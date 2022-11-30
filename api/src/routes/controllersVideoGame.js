require('dotenv').config();
const axios = require('axios');
const { Videogame, Genre, Platform, Op } = require('../db')
const { RAWG_APIKEY } = process.env;


const getApiGames = async (name) => {
  let apiGames = [];
  for (let i = 1; i < 2; i++) {
    let apiData = await axios.get(`https://api.rawg.io/api/games?key=${RAWG_APIKEY}&page=${i}`)
    let apiGame = apiData.data.results.map(game => {
      return {
        id: game.id,
        image: game.background_image,
        name: game.name,
        released: game.released,
        rating: game.rating,
        platforms: game.platforms.map(plat => plat.platform.name /*&& plat.platform.id*/),
        genres: game.genres.map(game => game.name /*&& game.id*/)
      }
    })
    apiGames = [...apiGames, ...apiGame]
  }
  return apiGames;
}

const getDbGames = async () => {
  return await Videogame.findAll(
    {
      include: {
        attributes: ['image', 'name', 'released', 'rating', 'genres', 'platforms']
      },
      include: {
        model: Genre,
        attributes: ['name'],
        through: {
          attributes: [],
        }
      },
      include: {
        model: Platform,
        attributes: ['name'],
        through: {
          attributes: [],
        }
      }
    }
  )
}

const getAllGames = async () => {
  let apiGames = await getApiGames();
  let dbGames = await getDbGames();
  let allGames = [...apiGames, ...dbGames].sort((a, b) => {
    if(a>b) return 1
    if(a<b) return -1
    else return 0
  })
  return allGames;
}

const getApiGamesByName = async (name) => {
  let apiGamesByName = [];
  for (let i = 1; i < 3; i++) {
    let apiData = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${RAWG_APIKEY}&page=${i}`)
    // if (!name) { return apiGamesByName }
    // else {
    let apiGame = apiData.data.results.map(game => {
      return {
        id: game.id,
        image: game.background_image,
        name: game.name,
        released: game.released,
        rating: game.rating,
        platforms: game.platforms.map(plat => plat.platform.name /*&& plat.platform.id*/),
        genres: game.genres.map(game => game.name /*&& game.id*/)
      }
    })
    apiGamesByName = [...apiGamesByName, ...apiGame]
  }
  return apiGamesByName;
  // }
}

const getDbGamesByName = async (name) => {
  let gamesByName = await Videogame.findAll(
    {
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      },
      include: {
        model: Genre,
        attributes: ['name'],
        through: {
          attributes: [],
        }
      },
      include: {
        model: Platform,
        attributes: ['name'],
        through: {
          attributes: [],
        }
      }
    });
  return gamesByName
}

const getGamesByName = async (name) => {
  let apiGamesByName = await getApiGamesByName(name)
  let dbGamesByName = await getDbGamesByName(name)
  let allGamesByName = [...dbGamesByName, ...apiGamesByName].splice(0, 15)

  if (allGamesByName.length > 0 || allGamesByName.length < 16) {
    return allGamesByName
  } else {
    return 'No existen videojuegos con el nombre consultado'
  }
}

const getApiGameById = async (id) => {
  const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  if (regexExp.test(id) === true) {
    return await Videogame.findOne({
      where: {
        id: id,
      },
      attributes: {
        exclude: ['rating']
      },
      include: {
        model: Genre,
        attributes: ['name'],
        through: {
          attributes: [],
        }
      },
      include: {
        model: Platform,
        attributes: ['name'],
        through: {
          attributes: [],
        }
      }
    })
  } else {
    let apiData = await axios.get(`https://api.rawg.io/api/games/${id}?key=${RAWG_APIKEY}`)
    let result = apiData.data
    console.log(result)
    if (result.id === parseInt(id)) {
      return {
        image: result.background_image,
        name: result.name,
        genres: result.genres.map(genre => genre.name),
        description: result.description.replace(/<[^>]*>?/g, ''),
        released: result.released,
        platforms: result.platforms.map(plat => plat.platform.name)
      }
    }
  }
}

// const dbGameById = async (id) => {
//   const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

//   if (regexExp.test(id) === true) {
//     let game = await Videogame.findOne({
//       where: {
//         id: id,
//       },
//       attributes: {
//         exclude: ['rating']
//       },
//       include: {
//         model: Genre,
//         attributes: ['name'],
//         through: {
//           attributes: [],
//         }
//       }
//     })
//     if (game) return game
//     else { return 'No existen videojuegos con el id consultado' }
//   }
// }

const addGame = async (image, name, description, released, rating, genres, platforms) => {
  const newGame = await Videogame.create({
    image,
    name,
    description,
    released,
    rating,
    genres: genres.name,
    platforms: platforms.name
    },
    {
      include: {
        model: Genre,
        attributes: ['name'],
        through: {
          attributes: []
        },
      }
    },
    {
      include: {
        model: Platform,
        attributes: ['name'],
        through: {
          attributes: []
        },
      }
    }
  )
  return newGame;
}


module.exports = {
  getApiGames,
  getDbGames,
  getAllGames,
  getApiGamesByName,
  getGamesByName,
  getDbGamesByName,
  getApiGameById,
  addGame,

}