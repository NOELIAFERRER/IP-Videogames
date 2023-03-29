import React from "react";
//components
import Rating from "../Rating/Rating";
//styles
import styles from "./Details.module.css";

const Details = ({
  image,
  name,
  genres,
  description,
  released,
  rating,
  platforms,
}) => {
  return (
    <div className={styles.description}>
      <div className={styles.header}>
        <img src={image} alt="portada del videojuego" />
        <div className={styles.name}>
          <div className={styles.title}>{name}</div>
          <div>
            <Rating rating={rating} />
          </div>
          <div className={styles.info}>
            {genres?.map((g) => (
              <div className={styles.list} key={g.key}>
                {g}
              </div>
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
          {platforms?.map((p) => (
            <div className={styles.list} key={p.id}>
              {p}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
