import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import {
    getAllGames,
    // getGenres,
    getGamesByGenre,
    getGamesFilter,
    sortGames,
    sortGamesByRating
} from "../redux/actions";
import Videogames from './Videogames';
import Game from './Game';
import Pagination from './Pagination';
import styles from '../styles/Home.module.css'


const Home = () => {

    const games = useSelector(state => state.games)
    const allGames = useSelector(state => state.allGames)
    // const allGenres = useSelector(state => state.genres)
    const dispatch = useDispatch()

    const [currentPage, setCurrentPage] = useState(1);
    const [gamesXPage, setGamesXPage] = useState(15);
    const indexLastGame = currentPage * gamesXPage;
    const indexFirstGame = indexLastGame - gamesXPage;
    const currentGames = games.slice(indexFirstGame, indexLastGame);
    // const [currentGames, setCurrentGames] = useState([games.slice(indexFirstGame, indexLastGame)])

    const paging = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const allGen = allGames.map((g) => g.genres).flat();
    //   Elimino los valores repetidos y ordeno alfabéticamente
    const allGenres = [...new Set(allGen)].sort((a, b) => {
      if (a.toLowerCase() > b.toLowerCase()) return 1;
      if (a.toLowerCase() < b.toLowerCase()) return -1;
      else return 0;
    });

    // const [select, setSelect] = useState('');

    useEffect(() => {
       dispatch(getAllGames());
       console.log('indexFirstGame', indexFirstGame)
       console.log('currentGames', currentGames)
      }, [dispatch]);


    // console.log(allGenres)

    // const onChangeHandler = (event) => {
    //     event.target.value === 'genres'        
    //         ? dispatch(getGamesByGenre(event.target.value))
    //         : dispatch(getGamesFilter(event.target.value))
    //     setCurrentPage(1);
    //     console.log('event.target.value:',event.target.value)
    // }

    const genreHandler = (event) => {
        event.preventDefault();
        dispatch(getGamesByGenre(event.target.value))
        // setSelect(games)
        setCurrentPage(1);        
    }

    const filterHandler = (event) => {
        event.preventDefault();
        dispatch(getGamesFilter(event.target.value))
        // setSelect(games)
        setCurrentPage(1);        
    }

    //probando filtr x videogames existentes o agregados
    // const onChangeHandler = (event) => {
    //     dispatch(getGamesFilter(event.target.value))
    //     setCurrentPage(1);
    //     console.log(event.target.value)
    //     console.log(games)
    // }

    //probando filtro x genero
    // const filterByGenreHandler = (event) => {
    //     dispatch(getGamesByGenre(event.target.value))
    //     setCurrentPage(1)
    //     console.log(event.target.value)
    //     console.log(games)
    // }

    const sortHandler = (event) => {
        event.preventDefault();
        dispatch(sortGames(event.target.value))
        // setSelect(games)
        setCurrentPage(1);
        console.log('action.sort:',event.target.value)
        console.log('games', games)
        console.log('indexFirstGame', indexFirstGame)
       console.log('currentGames', currentGames)
    }
    // console.log(games)

    const ratingHandler = (event) => {
        event.preventDefault();
        dispatch(sortGamesByRating(event.target.value))
        setCurrentPage(1);
        // setSelect(games);
        console.log(event.target.value)
        console.log(games)
    }

    return (
        <div className={styles.container}>
            <div>
                <Pagination
                    gamesXPage={gamesXPage}
                    games={games.length}
                    paging={paging}
                />
            </div>
            <div className={styles.home}>
                <div className={styles.selectors}>                
                    <select className={styles.bars} name='sort' onChange={(e) => sortHandler(e)}>
                        <option name='SORT A-Z' value='no order' >SORT by NAME</option>
                        <option name='ascendent' value='ascendent' >A-Z</option>
                        <option name='descendent' value='descendent'>Z-A</option>
                    </select>

                    <select className={styles.bars} name='sort' id='sorRat' onChange={(e) => ratingHandler(e)}>
                        <option name='SORT By Rating' id='no order'>SORT by RATING</option>
                        <option name='high' id='hig' value='high' >MAYOR RATING</option>
                        <option name='low' id='low' value='low'>MENOR RATING</option>
                    </select>

                    <select className={styles.bars} name='filterByGenre' id='filGen' onChange={(e) => genreHandler(e)}>
                        {/* <select className={styles.bars} name='filterByGenre' id='filGen' onChange={(e) => filterByGenreHandler(e)}> */}
                        <option name='genres' id='gen' value='genres'>TODOS LOS GENEROS</option>
                        {
                            allGenres.map(el => <option value={`${el}`}>{el.toUpperCase()}</option>)
                        }
                    </select>
                    <select className={styles.bars} name='filter' id='fil' onChange={(e) => filterHandler(e)}>
                        <option name='gameExist' id='exi' value='gameExist'>VIDEOGAMES EXISTENTES</option>
                        <option name='gameAd' id='add' value='gameAd'>VIDEOGAMES AGREGADOS</option>
                    </select>
                </div>
                <br />
                <div className={styles.games}>

                    {/* {currentGames.map((game, key) => */}
                    {currentGames.map((game, key) =>

                        <Link to={`/games/details/${game.id}`}>
                            <Game
                                key={game.id}
                                image={game.image}
                                name={game.name}
                                genres={game.genres}                                
                                rating={game.rating}
                            />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Home;

    // const games = useSelector((state) => state.games);

    // const [allGames, setAllGames] = useState(games);
    // const [items, setItems] = useState([...games].splice(0, gamesPerPage));
    // console.log(items)
    // const [currentPage, setCurrentPage] = useState(0);

    // const nextHandler = () => {
    //     const totalGames = allGames.length;
    //     const nextPage = currentPage + 1;
    //     const firstIndex = nextPage * gamesPerPage;

    //     if (firstIndex === totalGames) return;
    //     setItems([...allGames].splice(0, gamesPerPage))
    //     setCurrentPage(nextPage);
    // }

    // const prevHandler = () => {
    //     const prevPage = currentPage - 1;

    //     if (prevPage < 0) return;
    //     const firstIndex = prevPage * gamesPerPage;
    //     setItems([...allGames].splice(firstIndex, gamesPerPage))
    //     setCurrentPage(prevPage)
    // }

//     return (
//         <div>
//             <h4>Esto es el home</h4>

//             <div>
//                 <select name='sort' id='sor' value='sort'>
//                     <option name='ascendent' id='asc' value='ascendent'>ASCENDENTE</option>
//                     <option name='descendent' id='des' value='descendent'>DESCENDENTE</option>
//                 </select>

//                 <select name='filter' id='fil'>
//                     <option id='gen' value='genres'>GENRES</option>
//                     <option id='exi' value='exist'>EXISTE</option>
//                     <option id='add' value='added'>AGREGADO</option>
//                 </select>
//             </div>
//             <br />
//             <Videogames />

//         </div>
//     )
// }
// export default Home;

// export default function Home({name, image, genres}) {
//     const dispatch = useDispatch();
//     const games = useSelector(state => state.games);
//     console.log(games)

//     useEffect(() => {
//         dispatch(getAllGames())
//     }, [dispatch])

//     // if (games) {
//         return (
//             <div>
//                 <h2>esto es home</h2>
//                 {games.map(game =>
//                     <Game
//                         id={game.id}
//                         image={game.image}
//                         name={game.name}
//                         genres={game.genres}
//                     />
//                 )}
//             </div>
//         )
//     // } else {
//     //   return (
//     //      <div>
//     //         <h3>Loading</h3>
//     //      </div>
//     //   )
//     // }
// }

// export default Home;

