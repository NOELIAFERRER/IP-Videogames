import axios from "axios";
export const ERROR = "ERROR";
export const GET_ALL_GAMES = "GET_ALL_GAMES";
export const GET_GAME_BY_NAME = "GET_GAME_BY_NAME";
export const GET_GENRES = 'GET_GENRES';
export const GET_GAME_DETAILS = "GET_GAME_DETAILS";
export const GET_PLATFORMS = 'GET_PLATFORMS';
export const SORT_GAMES = "SORT_GAMES";
export const SORT_GAMES_BY_RATING = "SORT_GAMES_BY_RATING";
export const GET_GAMES_BY_GENRE = "GET_GAMES_BY_GENRE";
// export const GET_GAMES_BY_STATUS = 'GET_GAMES_BY_STATUS';
export const FILTER_GAMES = "FILTER_GAMES";
export const ADD_GAME = "ADD_GAME";
export const RESET_DETAILS = "RESET_DETAILS";

export const getAllGames = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get('/videogames');
      const allGames = response.data;
      // console.log(allGames)
      dispatch({
        type: GET_ALL_GAMES,
        payload: allGames,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};

export const getGameByName = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `/videogames/?name=${name}`
      );
      const gameByName = response.data;
      console.log(gameByName);
      dispatch({
        type: GET_GAME_BY_NAME,
        payload: gameByName,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};

export const getGameDetails = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `/videogames/${id}`
      );
      const gameDetail = response.data;
      console.log(gameDetail);
      dispatch({
        type: GET_GAME_DETAILS,
        payload: gameDetail,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};

export const addGame = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "/videogames", payload
      );
      console.log(response);
      return response;     
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};

export const getGenres = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get('/genres')
      console.log(response.data)
      dispatch({
        type: GET_GENRES,
        payload: response.data
      })
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error
      })
    }
  }
}

export const getPlatforms = () => {
  return async (dispatch) => {
    try{
      let response = await axios.get('/platforms')
      console.log(response.data)
      dispatch({
        type: GET_PLATFORMS,
        payload: response.data
      })
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error
      })
    }
  }  
}

export const sortGames = (payload) => {
  return (dispatch) => {
    try {
      dispatch({
        type: SORT_GAMES,
        payload,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};

export const sortGamesByRating = (payload) => {
  return (dispatch) => {
    try {
      dispatch({
        type: SORT_GAMES_BY_RATING,
        payload,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};

export const getGamesByGenre = (payload) => {
  return (dispatch) => {
    try {
      dispatch({
        type: GET_GAMES_BY_GENRE,
        payload,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};

export const filterGames = (payload) => {
  return (dispatch) => {
    try {
      dispatch({
        type: FILTER_GAMES,
        payload,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};

export const resetGameDetails = () => {
  return (dispatch) => {
    try {
      dispatch({
        type: RESET_DETAILS,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};
