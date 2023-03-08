import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGameDetails, resetGameDetails } from "../../redux/actions";
// import Details from "../Details/Details";
import styles from '../Details/GameDetail.module.css'

const GameDetail = (props) => {
    const gameId = props.match.match.params.id
    const gameDetail = useSelector(state => state.gameDetail);
    const { image, name, released, rating, description, genres, platforms } = gameDetail;
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGameDetails(gameId))
        return () => {
            dispatch(resetGameDetails())
        }
    }, [dispatch])

    console.log(gameDetail)

    return (
        <div className={styles.container}>
            {/* <h3>Esto es game details</h3>
            <p>{gameId}</p> */}
            <div className={styles.game}>
            {/* { gameDetail.length ?  */}

            <div className={styles.header}>
        <img className={styles.img} src={image} alt="portada del videojuego" />
        <div className={styles.title}>
          <div className={styles.name}>
            <h4>{name}</h4>
          </div>
          <br />
          <br />
          <div className={styles.boxinfo}>
            <div className={styles.listTitle}>
              <p>Lanzamiento: </p>
              <p>Rating: </p>
            </div>
            <div className={styles.listInfo}>
              <p>{released}</p>
              <p>{rating}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.detail}>
         
          <p>{description}</p>
        </div>
        <div className={styles.info}>
          <div className={styles.lines}>
            <p>GENERO: {genres}</p>
            <p>PLATAFORMAS: {platforms}</p>         
          </div>         
        </div>
      </div>

                {/* <Details 
                    image = {gameDetail.image}
                    name = {gameDetail.name}
                    released = {gameDetail.released}
                    rating = {gameDetail.rating}
                    description = {gameDetail.description}
                    genres = {gameDetail.genres}
                    platforms = {gameDetail.platforms}                
                 />     */}


                {/* : 'Loading'              */}
            {/* } */}
            </div>
        </div>
    )
}

export default GameDetail;