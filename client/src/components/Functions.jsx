import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  getAllGames,
  // getGenres,
  getGamesByGenre,
  filterGames,
  sortGames,
  sortGamesByRating,
} from "../redux/actions";

import styles from "../styles/Functions.module.css";

const Functions = ({ setCurrentPage }) => {
  const games = useSelector((state) => state.games);
  const allGames = useSelector((state) => state.allGames);
  const dispatch = useDispatch();

  // Mapeo los géneros para enviarlos al select
  const allGen = allGames.map((g) => g.genres).flat();
  // Elimino los valores repetidos y ordeno alfabéticamente
  const allGenres = [...new Set(allGen)].sort((a, b) => {
    if (a.toLowerCase() > b.toLowerCase()) return 1;
    if (a.toLowerCase() < b.toLowerCase()) return -1;
    else return 0;
  });

  const genreHandler = (event) => {
    event.preventDefault();
    dispatch(getGamesByGenre(event.target.value));

    setCurrentPage(1);
  };

  const filterHandler = (event) => {
    event.preventDefault();
    dispatch(filterGames(event.target.value));

    setCurrentPage(1);
  };

  const sortHandler = (event) => {
    event.preventDefault();
    dispatch(sortGames(event.target.value));

    setCurrentPage(1);
  };

  const ratingHandler = (event) => {
    event.preventDefault();
    dispatch(sortGamesByRating(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className={styles.selectors}>
      <select
        className={styles.bars}
        name="sort"
        onChange={(e) => sortHandler(e)}
      >
        <option name="SORT A-Z" value="no order">
          SORT by NAME
        </option>
        <option name="ascendent" value="ascendent">
          A-Z
        </option>
        <option name="descendent" value="descendent">
          Z-A
        </option>
      </select>

      <select
        className={styles.bars}
        name="sort"
        id="sorRat"
        onChange={(e) => ratingHandler(e)}
      >
        <option name="SORT By Rating" id="no order">
          SORT by RATING
        </option>
        <option name="high" id="hig" value="high">
          MAYOR RATING
        </option>
        <option name="low" id="low" value="low">
          MENOR RATING
        </option>
      </select>

      <select
        className={styles.bars}
        name="filterByGenre"
        id="filGen"
        onChange={(e) => genreHandler(e)}
      >
        <option name="genres" id="gen" value="genres">
          TODOS LOS GENEROS
        </option>
        {allGenres.map((el) => (
          <option value={`${el}`}>{el.toUpperCase()}</option>
        ))}
      </select>
      <select
        className={styles.bars}
        name="filter"
        id="fil"
        onChange={(e) => filterHandler(e)}
      >
        <option name="gameExist" id="exi" value="gameExist">
          VIDEOGAMES EXISTENTES
        </option>
        <option name="gameAd" id="add" value="gameAd">
          VIDEOGAMES AGREGADOS
        </option>
      </select>
    </div>
  );
};

export default Functions;
