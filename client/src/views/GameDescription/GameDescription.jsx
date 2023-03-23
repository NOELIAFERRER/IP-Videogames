import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllGames,
  getGameDetails,
  resetGameDetails,
} from "../../redux/actions";
import Details from "../../components/Details/Details";
import SimilarGames from "../../components/SimilarGames/SimilarGames";
import styles from "./GameDescription.module.css";

const GameDescription = (props) => {
  const gameId = props.match.match.params.id;
  //preparo para los juegos similares
  const allGames = useSelector((state) => state.allGames);

  const gameDetail = useSelector((state) => state.gameDetail);
  const { image, name, released, rating, description, genres, platforms, id } =
    gameDetail;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGameDetails(gameId));
    return () => {
      dispatch(resetGameDetails());
    };
  }, [dispatch, gameId]);


  //*******preparo para los juegos similares**********
  useEffect(() => {
    if (!allGames.length) dispatch(getAllGames());
  }, [dispatch, allGames.length]);

  //filtro los juegos que tienen géneros similares a los del juego elegido
  const similar = genres
    ?.map((genre) =>
      allGames.filter(
        (game) => game.genres.includes(genre) && game.name !== name
      )
    )
    .flat();

  return (
    <div className={styles.container}>

      <Details
        className={styles.details}
        key={id}
        image={image}
        name={name}
        released={released}
        rating={rating}
        description={description}
        genres={genres}
        platforms={platforms}
      />

      <div className={styles.gameBox}>
        <SimilarGames similar={similar} name={name} />
      </div>
    </div>
  );
};

export default GameDescription;
