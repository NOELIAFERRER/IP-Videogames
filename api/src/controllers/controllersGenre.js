require('dotenv').config();
const axios = require('axios');
const { Videogame, Genre, Op, conn } = require('../db')
const { RAWG_APIKEY } = process.env;

const getGenres = async () => {



//     const apiData = (await axios.get(`https://rawg.io/api/genres?key=${RAWG_APIKEY}`))
//     console.log(apiData.data)
//     // return apiData.data
//     const result = apiData.data.results.map(genre => { return {name: genre.name}})
//     console.log(result)   
//     // return result;
//     const resultDb = Genre.bulkCreate(result);
//     console.log(resultDb)
//     return resultDb;
// }

    var resultDb = await Genre.findAll({
        where: {
            name: {
                [Op.notLike]: ''
            }
        }
    });

    if (!resultDb.length) {
        const apiData = (await axios.get(`https://rawg.io/api/genres?key=${RAWG_APIKEY}`))
        const result = apiData.data.results.map(genre => { return {name: genre.name }})
        resultDb = Genre.bulkCreate(result);
        console.log(resultDb)
    }
    return resultDb;
}

module.exports = { getGenres }