import React from "react";
//icons
import { BsStarFill, BsStarHalf } from "react-icons/bs";
//estilos
import styles from "./Rating.module.css";

const Rating = ({ rating }) => {
  //devuelvo la parte entera del rating
  const ratingInt = Math.floor(rating);

  console.log("ratingtInt", ratingInt);

  //transformo la cantidad de enteros en elementos de un array

  //   if (rating < 2) stars.push();
  //   if (rating < 3) stars.push();

  //compruebo si hay parte decimal del rating
  let float = rating - ratingInt;

  //si el resto es mayor a 0 => media estrella
  return (
    <div className={styles.container}>
      <div className={styles.stars}>
        {rating < 2 ? (
          <BsStarFill/>
        ) : rating < 3 ? (
          <div>
            <BsStarFill />
            <BsStarFill />
          </div>
        ) : rating < 4 ? (
          <div>
            <BsStarFill />
            <BsStarFill />
            <BsStarFill />
          </div>
        ) : rating < 5 ? (
          <div>
            <BsStarFill />
            <BsStarFill />
            <BsStarFill />
            <BsStarFill />
          </div>
        ) : (
          <div>
            <BsStarFill />
            <BsStarFill />
            <BsStarFill />
            <BsStarFill />
            <BsStarFill />
          </div>
        )}
      </div>
      {/* <div> */}
      {float > 0 ? (
        <div>
          <BsStarHalf />
        </div>
      ) : (
        <></>
      )}
      {/* </div> */}
    </div>
  );
};

export default Rating;
