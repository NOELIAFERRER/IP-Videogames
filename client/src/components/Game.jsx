import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Game.module.css";

const Game = ({ image, name, id, genres }) => {
  return (
    <div className={styles.container}>
      <div>
        {/* <Link to={`/games/details/${id}`}> */}
        <img
          className={styles.image}
          src={image}
          alt="portada del videojuego"
        />
        {/* </Link> */}
      </div>
      <div className={styles.titles}>
        <p>
          {name}
          {/* <Link to={`/games/details/${id}`} className={styles.titles}>{name}</Link> */}
        </p>
        {/* <p>{genres}</p> */}
        {genres?.map((g) => (
          <p> {g} </p>
        ))}
      </div>
    </div>
  );
};

export default Game;

// const Game = ({ image, name, genres, description, released, rating, platforms }) => {
//     return (
//         <div className={styles.container}>
//             <div id='closeIcon' className='closeBtn'>
//                 <button>X</button>
//             </div>
//             <div className='gameCard'>
//                 <div className='gameTitle'>
//                     <img src='ruta' alt='imagen del videojuego' />
//                 </div>
//                 <NavLink to='/details'>{name}</NavLink>
//                 <div className='gameBody'>
//                     <div className='gameDetails'>
//                         <p>Género</p>
//                         <p>{genres}</p>
//                     </div>
//                     <div className='gameDetails'>
//                         <p>Released</p>
//                         <p>{released}</p>
//                     </div>
//                     <div className='gameDetails'>
//                         <p>Rating</p>
//                         <p>{rating}</p>
//                     </div>
//                     <div className='gameDetails'>
//                         <p>Platforms</p>
//                         <p>{platforms}</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Game;
