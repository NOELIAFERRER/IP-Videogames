require("dotenv").config();
const axios = require("axios");
const { Videogame, Genre, Platform, Op } = require("../db");
const { RAWG_APIKEY } = process.env;

const getApiGames = async (name) => {
  let apiGames = [];
  for (let i = 1; i < 3; i++) {
    let apiData = await axios.get(
      `https://api.rawg.io/api/games?key=${RAWG_APIKEY}&page=${i}`
    );
    let apiGame = apiData.data.results.map((game) => {
      return {
        id: game.id,
        image: game.background_image,
        name: game.name,
        released: game.released,
        rating: game.rating,
        platforms: game.platforms
          ?.map((p) => p.platform.name)
          .filter((p) => p !== ""),
        genres: game.genres?.map((g) => g.name).filter((g) => g !== ""),
      };
    });
    apiGames = [...apiGames, ...apiGame];
  }
  return apiGames;
};

const getDbGames = async () => {
  let dbGames = await Videogame.findAll({
    include: [
      { model: Genre, attributes: ["name"], through: { attributes: [] } },
      { model: Platform, attributes: ["name"], through: { attributes: [] } },
    ],
  });
  let dbGamesName = dbGames.map((g) => {
    return {
      id: g.id,
      name: g.name,
      released: g.released,
      rating: g.rating,
      genres: g.genres.map((g) => g.name).filter((g) => g !== ""),
      platforms: g.platforms.map((p) => p.name).filter((p) => p !== ""),
    };
  });
  return dbGamesName;
};

const getAllGames = async () => {
  let apiGames = await getApiGames();
  let dbGames = await getDbGames();
  let allGames = [...apiGames, ...dbGames].sort((a, b) => {
    if (a > b) return 1;
    if (a < b) return -1;
    else return 0;
  });
  return allGames;
};

const getApiGamesByName = async (name) => {
  let apiGamesByName = [];
  for (let i = 1; i < 3; i++) {
    let apiData = await axios.get(
      `https://api.rawg.io/api/games?search=${name}&key=${RAWG_APIKEY}&page=${i}`
    );
    let apiGame = apiData.data.results.map((game) => {
      return {
        id: game.id,
        image: game.background_image,
        name: game.name,
        released: game.released,
        rating: game.rating,
        platforms: game.platforms.map((plat) => plat.platform.name),
        genres: game.genres.map((game) => game.name),
      };
    });
    apiGamesByName = [...apiGamesByName, ...apiGame];
  }
  return apiGamesByName;
};

const getDbGamesByName = async (name) => {
  let gamesByName = await Videogame.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
    include: {
      model: Platform,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return gamesByName;
};

const getGamesByName = async (name) => {
  let apiGamesByName = await getApiGamesByName(name);
  let dbGamesByName = await getDbGamesByName(name);
  let allGamesByName = [...dbGamesByName, ...apiGamesByName].splice(0, 15);

  if (allGamesByName.length > 0 || allGamesByName.length < 16) {
    return allGamesByName;
  } else {
    return "No existen videojuegos con el nombre consultado";
  }
};

const getApiGameById = async (id) => {
  if (id && !isNaN(id)) {
    let apiData = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${RAWG_APIKEY}`
    );
    let result = apiData.data;
    if (result.id === parseInt(id))
      return {
        image: result.background_image,
        name: result.name,
        genres: result.genres.map((g) => g.name),
        description: result.description.replace(/<[^>]*>?/g, ""),
        released: result.released,
        rating: result.rating,
        platforms: result.platforms.map((plat) => plat.platform.name),
      };
  } else {
    let dbGameById = await Videogame.findOne({
      where: {
        id: id,
      },
      include: [
        { model: Genre, attributes: ["name"], through: { attributes: [] } },
        { model: Platform, attributes: ["name"], through: { attributes: [] } },
      ],
    });
    const game = dbGameById;
    if (game.id === id) {
      return {
        id: game.id,
        image: game.image,
        name: game.name,
        genres: game.genres?.map((g) => g.name),
        description: game.description,
        released: game.released,
        rating: game.rating,
        platforms: game.platforms.map((p) => p.name),
      };
    }
  }
};

const addGame = async (
  image,
  name,
  description,
  released,
  rating,
  genres,
  platforms
) => {
  const newGame = await Videogame.create({
    image,
    name,
    description,
    released,
    rating,
  });
  //recorro el array de géneros creando los que no están en la base de datos
  const genresCheck = genres.map(async (g) => {
    const [genre] = await Genre.findOrCreate({
      where: { name: g },
    });
    return genre;
  });
  //una vez que se encontraron y crearon los géneros que no estaban los guardo en una constante
  const gameGenres = await Promise.all(genresCheck);

  //recorro el array de plataformas esperando que cada plataforma se compruebe que existe, y si no existe se cree
  const platformCheck = platforms.map(async (p) => {
    const [platform] = await Platform.findOrCreate({ where: { name: p } });
    return platform;
  });
  //espero que se chequeen todas las plataformas
  const gamePlatforms = await Promise.all(platformCheck);

  newGame.addGenres(gameGenres);
  newGame.addPlatforms(gamePlatforms);
  console.log(newGame);
};

module.exports = {
  getApiGames,
  getDbGames,
  getAllGames,
  getApiGamesByName,
  getGamesByName,
  getDbGamesByName,
  getApiGameById,
  addGame,
};
