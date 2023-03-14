import React from "react";
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
    <div>
      <div className={styles.description}>
        <div className={styles.header}>
          <img
            className={styles.img}
            src={image}
            alt="portada del videojuego"
          />
          {/* <div className={styles.title}> */}
          <div className={styles.name}>
            <div className={styles.title}>{name}</div>
            <div>{rating}</div>

            <div className={styles.info}>
              {genres?.map((g, key) => (
                <div className={styles.list}>{g}</div>
              ))}
            </div>
            {/* <br />
            <br /> */}
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
      </div>
    </div>
  );
};

export default Details;
