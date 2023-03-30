require("dotenv").config();
const axios = require("axios");
const { Videogame, Genre, Op, conn } = require("../db");
const { RAWG_APIKEY } = process.env;

const getGenres = async () => {
  let resultDb = await Genre.findAll({
    where: {
      name: {
        [Op.notLike]: "",
      },
    },
  });

  if (!resultDb.length) {
    const apiData = await axios.get(
      `https://rawg.io/api/genres?key=${RAWG_APIKEY}`
    );
    const result = apiData.data.results.map((genre) => {
      return { name: genre.name };
    });
    resultDb = Genre.bulkCreate(result);
  }
  return resultDb;
};

const setGenres = async () => {
  const genres = await getGenres();
  genres.forEach((genre) => {
    Genre.findOrCreate({
      where: { name: genre.name },
    });
  });
};

module.exports = { setGenres, getGenres };
