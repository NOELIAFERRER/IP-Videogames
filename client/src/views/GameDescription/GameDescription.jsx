import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllGames,
  getGameDetails,
  resetGameDetails,
} from "../../redux/actions";
import Details from "../../components/Details/Details";
import SimilarGames from "../../components/SimilarGames/SimilarGames";
// import Details from "../Details/Details";
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

  // console.log(gameDetail);

  //*******preparo para los juegos similares**********
  useEffect(() => {
    if (!allGames.length) dispatch(getAllGames());
  }, [dispatch]);

  const similar = genres
    ?.map((genre) => allGames.filter((game) => game.genres.includes(genre)))
    .flat()
   
  
    
  console.log("similar => ", similar);

  //************acá termina************/

  return (
    <div className={styles.container}>
      <Details
        key={id}
        image={image}
        name={name}
        released={released}
        rating={rating}
        description={description}
        genres={genres}
        platforms={platforms}
      />

      {/* 
      <div className={styles.description}>
        <div className={styles.header}>
          <img
            className={styles.img}
            src={image}
            alt="portada del videojuego"
          />
          <div className={styles.name}>
            <div className={styles.title}>{name}</div>
            <div>{rating}</div>

            <div className={styles.info}>
              {genres?.map((g, key) => (
                <div className={styles.list}>{g}</div>
              ))}
            </div>

            <div className={styles.released}>
              <div>
                <p>Lanzamiento: </p>
              </div>
              <div>
                <p>{released}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.detail}>
            <p>{description}</p>
          </div>
          <div className={styles.info}>
            {platforms?.map((p, key) => (
              <div className={styles.list}>{p}</div>
            ))}
          </div>
        </div>
      </div> */}
      <div>
        {/* {similar?.map((g) => ( */}
          {/* // <p>{g.name}</p> */}
          <SimilarGames similar={similar}/>
        {/* ))} */}
      </div>
    </div>
  );
};

export default GameDescription;
