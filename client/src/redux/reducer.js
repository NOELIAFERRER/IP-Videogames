import {
  ERROR,
  GET_ALL_GAMES,
  GET_GAME_BY_NAME,
  // GET_GENRES,
  GET_GAME_DETAILS,
  // GET_PLATFORMS,
  SORT_GAMES,
  SORT_GAMES_BY_RATING,
  GET_GAMES_BY_GENRE,
  GET_GAMES_FILTER,
  ADD_GAME
} from "./actions"

const initialState = {
  games: [],
  allGames: [],
  genres: [],
  platforms: [],
  gameDetail: {},
  error: {}
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GAMES:
      return {
        ...state,
        games: action.payload,
        allGames: action.payload
      };
    case GET_GAME_BY_NAME:
      return {
        ...state,
        games: action.payload
      };
    // case GET_GENRES:
    //   let genresSorted = action.payload.map(el => el.name).sort((a, b) => {
    //     if (a.toLowerCase() > b.toLowerCase()) return 1
    //     if (a.toLowerCase() < b.toLowerCase()) return -1
    //     else return 0
    //   })
    //   // console.log(genresSorted)
    //   return {
    //     ...state,
    //     genres: genresSorted
    //   };
    // case GET_PLATFORMS:
    //   let allPlatforms = [];
    //   state.allGames.map(el => {

    //     //console.log(el.platforms)
    //     if (el.platforms) {
    //       allPlatforms = [...allPlatforms, ...el.platforms]
    //     }

    //   })
    //   allPlatforms = [...new Set(allPlatforms)].sort((a, b) => {
    //     if (a.toLowerCase() > b.toLowerCase()) return 1
    //     if (a.toLowerCase() < b.toLowerCase()) return -1
    //     else return 0
    //   })
    //   console.log(allPlatforms);
    //   return {
    //     ...state,
    //     platforms: allPlatforms,
    //   };
    case GET_GAME_DETAILS:
      return {
        ...state,
        gameDetail: action.payload
      };
    case GET_GAMES_BY_GENRE:
      const gamesFilterByGenre = state.allGames.filter(el => el.genres.includes(action.payload))
      console.log(state.allGames)
      console.log(gamesFilterByGenre)
      return {
        ...state,
        games: gamesFilterByGenre
      };
    case GET_GAMES_FILTER:
      const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
      const gamesFiltered = action.payload === 'gameExist' ?
      state.allGames.filter(game => regexExp.test(game.id) === false)
      : state.allGames.filter(game => regexExp.test(game.id) === true)
      console.log(gamesFiltered)
      return {
        ...state,
        games: gamesFiltered
      };
    case SORT_GAMES:
      const gamesSorted = action.payload === 'ascendent' 
        ? state.allGames.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
          return 0;
        })
        : state.allGames.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) return 1
          if (a.name.toLowerCase() > b.name.toLowerCase()) return -1
          return 0;
        })
      console.log(gamesSorted)
      return {
        ...state,
        games: gamesSorted
      };
    case SORT_GAMES_BY_RATING:
      const gamesSortedByRating = action.payload === 'high'
        ? state.allGames.sort((a, b) => b.rating - a.rating)
        : state.allGames.sort((a, b) => a.rating - b.rating)
      console.log(gamesSortedByRating)
      return {
        ...state,
        games: gamesSortedByRating
      };
    case ADD_GAME:
      return {
        ...state
      }
    case ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return { ...state }
  }
};

export default rootReducer;

