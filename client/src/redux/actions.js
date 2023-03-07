import axios from 'axios';
export const ERROR = 'ERROR';
export const GET_ALL_GAMES = 'GET_ALL_GAMES';
export const GET_GAME_BY_NAME = 'GET_GAME_BY_NAME';
// export const GET_GENRES = 'GET_GENRES';
export const GET_GAME_DETAILS = 'GET_GAME_DETAILS';
// export const GET_PLATFORMS = 'GET_PLATFORMS';
export const SORT_GAMES = 'SORT_GAMES';
export const SORT_GAMES_BY_RATING = 'SORT_GAMES_BY_RATING';
export const GET_GAMES_BY_GENRE = 'GET_GAMES_BY_GENRE'
// export const GET_GAMES_BY_STATUS = 'GET_GAMES_BY_STATUS';
export const GET_GAMES_FILTER = 'GET_GAMES_FILTER';
export const ADD_GAME = 'ADD_GAME';

export const getAllGames = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get('http://localhost:3001/videogames')
      const allGames = response.data
      // console.log(allGames)
      dispatch({
        type: GET_ALL_GAMES,
        payload: allGames
      })
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error
      })
    }
  }
}

export const getGameByName = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/videogames/?name=${name}`)
      const gameByName = response.data
      console.log(gameByName)
      dispatch({
        type: GET_GAME_BY_NAME,
        payload: gameByName
      })
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error
      })
    }
  }
}

export const getGameDetails = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/videogames/${id}`)
      const gameDetail = response.data
      console.log(gameDetail)
      dispatch({
        type: GET_GAME_DETAILS,
        payload: gameDetail
      })
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error
      })
    }

  }
}

export const addGame = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:3001/videogames', payload)
      console.log(response)
      return response 
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error
      })
    }
  }
}

// export const getGenres = () => {
//   return async (dispatch) => {
//     try {
//       let response = await axios.get('http://localhost:3001/genres')
//       console.log(response.data)
//       dispatch({
//         type: GET_GENRES,
//         payload: response.data
//       })
//     } catch (error) {
//       dispatch({
//         type: ERROR,
//         payload: error
//       })
//     }
//   }
// }

// export const getPlatforms = (payload) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get('http://localhost:3001/videogames')
//       const result = response.data
//       console.log(response.data)
//       const allPlatforms = new Set([result.data.map(game => game.platforms)])
//       console.log(allPlatforms)
//       // let platformsFilter = allPlatforms.map(plat => plat.name)
//       dispatch({
//         type: GET_PLATFORMS,
//         payload: allPlatforms
//       })
//     } catch (error) {
//       dispatch({
//         type: ERROR,
//         payload: error
//       })
//     }
  // }



export const sortGames = (payload) => {
  return (dispatch) => {
    try {
      dispatch({
        type: SORT_GAMES,
        payload
      })
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error
      })
    }
  }
}

export const sortGamesByRating = (payload) => {
  return (dispatch) => {
    try {
      dispatch({
        type: SORT_GAMES_BY_RATING,
        payload
      })
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error
      })
    }
  }
}

export const getGamesByGenre = (payload) => {
  return (dispatch) => {
    try {
      dispatch({
        type: GET_GAMES_BY_GENRE,
        payload
      })
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error
      })
    }
  }
}

export const getGamesFilter = (payload) => {
  return (dispatch) => {
    try {
      dispatch({
        type: GET_GAMES_FILTER,
        payload
      })

    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error
      })
    }
  }
}


