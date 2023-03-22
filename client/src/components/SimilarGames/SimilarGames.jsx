import React, { useEffect } from "react";
import Game from "../Game/Game";
import { getAllGames } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const SimilarGames = ({ similar }) => {
  const gameListed = {};
  
  // ordeno alfabéticamente los nombres de todos los juegos similares
  const gamesName = similar
    ?.map((el) => el.name)
    .sort((a, b) => {
      if (a.toLowerCase() > b.toLowerCase()) return 1;
      if (a.toLowerCase() < b.toLowerCase()) return -1;
      else return 0;
    });
  console.log("gamesName=>", gamesName);

  // elimino duplicados
  const gamesSimilar = [...new Set(gamesName)];
  console.log("gamesSimilar=>", gamesSimilar);

  //guardo en un objeto los juegos y les asigno una cantidad = 1
  const gamesObject = { };
  const similarGames = [];
  gamesSimilar.forEach((el) => similarGames.push(gamesObject[el] = 1));
  console.log("similarGames=>", similarGames);
  console.log('gamesObject=>', gamesObject)

  // cuento la cantidad de juegos similares que están repetidos
  for(let i = 0; i < gamesName.length; i++){
    if(gamesName[i+1] === gamesName[i]){
      console.log('gamesName[i]', gamesName[i])
      ++gamesObject[gamesName[i]]
    }
  } 
  console.log('gamesObjectTotal=>', gamesObject)
  



  return (
    <div>
      {similar?.map((el) => (
        // <div>
        <p> {el.name} </p>

        // </div>

        // <Game
        //    image={el.image}
        //    name={el.name}
        //    rating={el.rating}
        //    genres={el.genres}
        // />
      ))}
    </div>
  );
};

export default SimilarGames;
