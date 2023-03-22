import React from "react";
// import { Link } from "react-router-dom";
//estilos
import styles from "../Game/Game.module.css";

const Game = ({ image, name, id, genres, rating }) => {
  return (
    <div className={styles.container}>
      <div>
        {/* <Link to={`/games/details/${id}`}> */}
        <img
          // className={styles.image}
          src={image}
          alt="portada del videojuego"
        />
        {/* </Link> */}
      </div>
      <div className={styles.titles}>
        <div>{name}</div>
        <div>
          {/* <Link to={`/games/details/${id}`} className={styles.titles}>{name}</Link> */}
          <div className={styles.rating}>{rating}</div>
        </div>
      </div>
      <div className={styles.genres}>
        {genres?.map((g, key) => (
          <div className={styles.genre} key={g.id}>
            {g}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
