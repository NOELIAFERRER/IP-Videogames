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
        
        const result = apiData.data.results.map(p => {return {name: p.name }})
        // resultDb = Platform.bulkCreate(result);
        resultDb= result
        console.log('platforms:',result)
    }
        return resultDb
    }

    
    const setPlatforms = async () => {
        const platform = await getPlatforms()
    
        platform.forEach(p => {
            Platform.findOrCreate({
                where: { name: p.name}
            })
        })
    }    

module.exports = { getPlatforms, setPlatforms }