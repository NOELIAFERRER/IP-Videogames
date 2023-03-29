import React from "react";
//components
import Rating from "../Rating/Rating";
//styles
import styles from "../Game/Game.module.css";

const Game = ({ image, name, id, genres, rating }) => {
  return (
    <div className={styles.container}>
      <div>
        <img src={image} alt="portada del videojuego" />
      </div>
      <div className={styles.titles}>
        <div>{name}</div>
        <div>
          <div className={styles.rating}>
            <Rating rating={rating} />
          </div>
        </div>
      </div>
      <div className={styles.genres}>
        {genres?.map((g) => (
          <div className={styles.genre} key={g.id}>
            {g}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
