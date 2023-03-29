import React from "react";
//icons
import { BsStarFill, BsStarHalf } from "react-icons/bs";
//styles
import styles from "./Rating.module.css";

const Rating = ({ rating }) => {
  //devuelvo la parte entera del rating
  const ratingInt = Math.floor(rating);

  //transformo la cantidad de enteros en elementos de un array
  let stars = [];

  for (let i = 0; i < ratingInt; i++) {
    stars.push(<BsStarFill key={i} />);
  }

  //compruebo si hay parte decimal del rating
  let float = rating - ratingInt;
 
  return (
    <div className={styles.container}>
      <div>{stars}</div>
      {float > 0 ? (
        <div>
          <BsStarHalf />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Rating;
