import {
  ERROR,
  GET_ALL_GAMES,
  GET_GAME_BY_NAME,
  GET_GENRES,
  GET_GAME_DETAILS,
  GET_PLATFORMS,
  SORT_GAMES,
  SORT_GAMES_BY_RATING,
  GET_GAMES_BY_GENRE,
  FILTER_GAMES,
  ADD_GAME,
  RESET_DETAILS,
  // GET_SIMILAR_GAMES
} from "./actions"

const initialState = {
  games: [],
  allGames: [],
  genres: [],
  platforms: [],
  gameDetail: {},
  // similarGames: [],
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
    case GET_GENRES:
      let genresSorted = action.payload.map(el => el.name).sort((a, b) => {
        if (a.toLowerCase() > b.toLowerCase()) return 1
        if (a.toLowerCase() < b.toLowerCase()) return -1
        else return 0
      })
      // console.log(genresSorted)
      return {
        ...state,
        genres: genresSorted
      };
      case GET_PLATFORMS:
        let platformsSorted = action.payload.map(el => el.name).sort((a, b) => {
          if (a.toLowerCase() > b.toLowerCase()) return 1
          if (a.toLowerCase() < b.toLowerCase()) return -1
          else return 0
        })
        // console.log(platformsSorted)
        return {
          ...state,
          platforms: platformsSorted
        }; 
    case GET_GAME_DETAILS:
      return {
        ...state,
        gameDetail: action.payload
      };
    case GET_GAMES_BY_GENRE:
      const gamesUp = [...state.games]
      const gamesFilterByGenre = action.payload === 'genres'
      ? state.allGames
      : gamesUp.filter(el => el.genres.includes(action.payload))
      // console.log(state.allGames)
      console.log(gamesFilterByGenre)
      return {
        ...state,
        games: gamesFilterByGenre
      };
    case FILTER_GAMES:
      const gamesUpdat = [...state.games];
      const regexExp = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/gi;

      const gamesFiltered = action.payload === 'createdGames' 
      ? gamesUpdat.filter(game => regexExp.test(game.id))
     
      // ? state.allGames.filter(game => regexExp.test(game.id) === false)
      // : gamesUpdat.filter(game => regexExp.test(game.id) === true)
      : gamesUpdat

      console.log(gamesFiltered)
      return {
        ...state,
        games: gamesFiltered
      };
    case SORT_GAMES:
         const gamesUpdated = [...state.games];
         let gamesSorted = [];
         action.payload === 'ascendent'
         ? gamesSorted = gamesUpdated.sort((a,b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
         : action.payload === 'descendent'
         ? gamesSorted =  gamesUpdated.sort((a,b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()))
         : gamesSorted = gamesUpdated;
    
      return {
        ...state,
        games: gamesSorted
      };
    case SORT_GAMES_BY_RATING:
        const gamesUpd = [...state.games];
        let gamesSortedByRating = [];
        action.payload === 'high'
        ? gamesUpd.sort((a, b) => b.rating - a.rating)
        : action.payload === 'low'
        ? gamesUpd.sort((a, b) => a.rating - b.rating)
        : gamesSortedByRating = gamesUpd;
      // console.log(gamesSortedByRating)
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
    // case GET_SIMILAR_GAMES:
    //   const gamesUpdate = [...state.allGames]
    //   const { genres } = state.gameDetail
      // let gamesSelected = []
      // for(let i=0; i<action.payload.length; i++){
      //   gamesSelected= gamesUpdate.filter(g => g.genres.includes(action.payload[i]))
      // }

      // const gamesSelection = action.payload.map(gameGenre => gamesUpdate.filter(games => games.genre.includes(gameGenre))).flat()
      // const gamesSelection = genres.map(genre => gamesUpdate.filter(game => game.genres.includes(genre))).flat()
      // const gamesSelection =action.payload.map(genre => gamesUpdate.filter(game => game.genres.includes(genre))).flat()


        // console.log('gamesSelected:',gamesSelected)

      // const gameSelected = state.gameDetail
      // const similarGames = gameSelected.genres.length = 1 
      // ? state.allGames.filter(g => g.genres.includes(gameSelected.genres.name)).slice(0, 6)
      // : state.allGames
      // console.log('state.gameDetail.genres =>', state.gameDetail.genres)
      // console.log('gamesUpdate => ', gamesUpdate)
      // console.log('gamesSelection',gamesSelection)
      // return{
      //   ...state,
      //   similarGames: gamesSelection
      // }
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

