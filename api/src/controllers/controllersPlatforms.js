require('dotenv').config();
const axios = require('axios');
const { Videogame, Platform, Op, conn } = require('../db')
const { RAWG_APIKEY } = process.env;

const getPlatforms = async () => {

    let resultDb = await Platform.findAll({
        where: {
            name: {
                [Op.notLike]: ''
            }
        }
    });

    if (!resultDb.length) {
        const apiData = (await axios.get(`https://rawg.io/api/platforms?key=${RAWG_APIKEY}`))
        const result = apiData.data.results.map(platform => {return {name: platform.name }})
        resultDb = Platform.bulkCreate(result);
    }
        return resultDb
    }

    
    const setPlatforms = async () => {
        const platform = await getPlatforms()
        platform.forEach(platform => {
            Platform.findOrCreate({
                where: { name: platform.name}
            })
        })       
    }    

module.exports = { getPlatforms, setPlatforms }