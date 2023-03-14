import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
// redux
import { getAllGames } from "../../redux/actions";
// import Videogames from './Videogames';
//components
import Pagination from "../../components/Pagination/Pagination";
import Functions from "../../components/Functions/Functions";
import Game from "../../components/Game/Game";
import styles from "../Home/Home.module.css";

const Home = () => {
  const games = useSelector((state) => state.games);
  const dispatch = useDispatch();

  // Preparación para paginar 15 juegos x vista
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesXPage, setGamesXPage] = useState(15);
  const indexLastGame = currentPage * gamesXPage;
  const indexFirstGame = indexLastGame - gamesXPage;
  const currentGames = games.slice(indexFirstGame, indexLastGame);
//   const currentGames = games.slice(0, 15);
//   const currentGamess = games.slice(16, 30);

  const paging = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllGames());
   
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {/* <div className={styles.pages}> */}
        <Pagination
          gamesXPage={gamesXPage}
          games={games.length}
          paging={paging}
        />
      {/* </div> */}
      <div className={styles.body}>
        {/* <div className={styles.selectors}> */}
          <Functions setCurrentPage={setCurrentPage} />
        {/* </div> */}

        {/* <br /> */}
        <div className={styles.games}>
          {currentGames.map((game) => (
            <div className={styles.gameBox}>
            <Link to={`/games/details/${game.id}`}>
              <Game 
                className={styles.card}
                key={game.id}
                image={game.image}
                name={game.name}
                genres={game.genres}
                rating={game.rating}
              />
            </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;
