import React from "react";
import styles from '../styles/Details.module.css'

const Details = ({ image, name, genres, description, released, rating, platforms }) => {
   return (
      <div className={styles.container}>
         <h2>esto es Details</h2>
         <div className={styles.img}>
            <img className={styles.img} src={image} alt='portada del videojuego' />
         </div>
         <div>
            <h4>{name}</h4>
         </div>
         <div className={styles.info}>
            <div className={styles.lines}>
               <p>Lanzamiento</p>
               <p>{released}</p>
            </div>
            <div className={styles.lines}>
               <p>Rating</p>
               <p>{rating}</p>
            </div>
         </div>
         <div className={styles.detail}>
            <h4>Detalles</h4>
            <p>{description}</p>
         </div>
         <div className={styles.info}>
            <div className={styles.lines}>
               <p>Género</p>
               <p>{genres}</p>
            </div>
            <div className={styles.lines}>
               <p>Plataformas</p>
               <p>{platforms}</p>
            </div>
         </div>
      </div>
   )
}

export default Details;