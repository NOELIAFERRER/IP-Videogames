import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGameDetails, resetGameDetails } from "../../redux/actions";
// import Details from "../Details/Details";
import styles from "../Details/GameDetail.module.css";

const GameDetail = (props) => {
  const gameId = props.match.match.params.id;
  const gameDetail = useSelector((state) => state.gameDetail);
  const { image, name, released, rating, description, genres, platforms } =
    gameDetail;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGameDetails(gameId));
    return () => {
      dispatch(resetGameDetails());
    };
  }, [dispatch]);

  console.log(gameDetail);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img className={styles.img} src={image} alt="portada del videojuego" />
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
  );
};

export default GameDetail;
