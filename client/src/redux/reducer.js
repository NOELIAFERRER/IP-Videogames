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
  FILTER_GAMES,
  ADD_GAME,
  RESET_DETAILS
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
      const gamesUp = [...state.games]
      const gamesFilterByGenre = action.payload === 'all'
      ? gamesFilterByGenre = gamesUp
      : gamesUp.filter(el => el.genres.includes(action.payload))
      // console.log(state.allGames)
      console.log(gamesFilterByGenre)
      return {
        ...state,
        games: gamesFilterByGenre
      };
    case FILTER_GAMES:
      const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
      const gamesFiltered = action.payload === 'gameExist' 
      ? state.allGames
      // ? state.allGames.filter(game => regexExp.test(game.id) === false)
      : state.allGames.filter(game => regexExp.test(game.id) === true)
      console.log(gamesFiltered)
      return {
        ...state,
        games: gamesFiltered
      };
    case SORT_GAMES:
         const gamesUpdated = [...state.games];
         const gamesSorted = action.payload === 'ascendent'
         ? gamesUpdated.sort((a,b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
         : action.payload === 'descendent'
         ? gamesUpdated.sort((a,b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()))
         : gamesSorted = gamesUpdated;
    
      return {
        ...state,
        games: gamesSorted
      };
    case SORT_GAMES_BY_RATING:
        const gamesUpd = [...state.games];
        const gamesSortedByRating = action.payload === 'high'
        ? gamesUpd.sort((a, b) => b.rating - a.rating)
        : action.payload === 'low'
        ? gamesUpd.sort((a, b) => a.rating - b.rating)
        : gamesSortedByRating = gamesUpd;
      console.log(gamesSortedByRating)
      return {
        ...state,
        games: gamesSortedByRating
      };
    case ADD_GAME:
      return {
        ...state
      }
    case RESET_DETAILS:
      return{
        ...state,
        gameDetail: {}
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

