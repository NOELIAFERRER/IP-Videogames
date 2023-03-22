import React, { useEffect } from "react";
// import Game from "../Game/Game";
// import { getAllGames } from "../../redux/actions";
// import { useDispatch, useSelector } from "react-redux";

const SimilarGames = ({ similar, name }) => {

  console.log('similar=>', similar)

  // ordeno alfabéticamente los nombres de todos los juegos similares
  const gamesName = similar
    ?.map((el) => el.name)
    .sort((a, b) => {
      if (a.toLowerCase() > b.toLowerCase()) return 1;
      if (a.toLowerCase() < b.toLowerCase()) return -1;
      else return 0;
    });
  // console.log("gamesName=>", gamesName);

  // elimino duplicados
  const gamesNameFilter = [...new Set(gamesName)];
  // console.log( 'gamesNameFilter=>', gamesNameFilter);

  //guardo en un array los juegos x nombre y le asigno la cantidad = 1
  const similarGames = [];
 gamesNameFilter.forEach((el) => similarGames.push({name: el, quantity: 1}));
  // console.log("similarGames=>", similarGames);
 
  // cuento la cantidad de juegos similares que están repetidos
  for(let i = 0; i < gamesName?.length; i++){
    if(gamesName[i+1] === gamesName[i]){
      similarGames.map((el) => el.name === gamesName[i] && ++el.quantity)
    }
  } 
  // console.log("similarGames=>", similarGames);

  // ordeno según mayor coincidencia de géneros  y devuelvo los primeros 6 juegos
  const suggestedList = similarGames.sort((a, b) => b.quantity - a.quantity 
  || a.name.includes(name) ? -1 : b.name.includes(name) ? 1 : 0
  ).slice(0, 6)
  console.log('suggestedList=>', suggestedList)

  //busco las demás propiedades de los juegos similares para renderizarlos
  const suggestedGames = suggestedList.map((game) => similar.find((el) => el.name === game.name))
  console.log('suggestGames=>', suggestedGames )

 

  //selecciono de esos juegos los que además contengan nombre parecido  
  // const suggestedGames = list.sort((a, b) => a.name.includes(name) ? -1 : b.name.includes(name) ? 1 : 0)

  // console.log('name=>', name)
  // console.log('suggestedGames=>', suggestedGames)
  
 
  return (
    <div>
      {suggestedGames?.map((el) => (
        <div>
        <p> {el.name} </p>
        <p> {el.rating} </p>

        </div>

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
