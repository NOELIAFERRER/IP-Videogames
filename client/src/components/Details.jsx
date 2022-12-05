import React from "react";
import styles from '../styles/Details.module.css'

const Details = ({ image, name, genres, description, released, rating, platforms }) => {
   return (
      <div className={styles.container}>
         <div className={styles.header}>
            <img className={styles.img} src={image} alt='portada del videojuego' />
            <div className={styles.title}>
               <div className={styles.name}>
                  <h4 >{name}</h4>
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
               {/* <h4>Detalles</h4> */}
               <p>{description}</p>
            </div>
            <div className={styles.info}>
               <div className={styles.lines}>
                  <p>GENERO:  {genres}</p>
                  <p>PLATAFORMAS:  {platforms}</p>
                  {/* <p>{genres}</p> */}
               </div>
               {/* <div className={styles.lines}>

                  {/* <p>{platforms}</p> */}
            {/* </div> */}
         </div>
      </div>
      </div >
   )
}

export default Details;