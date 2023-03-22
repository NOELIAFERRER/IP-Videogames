import React from "react";
//componentes
import Game from "../Game/Game";


const SimilarGames = ({ similar, name }) => {

  // ordeno alfabéticamente los nombres de todos los juegos similares
  const gamesName = similar
    ?.map((el) => el.name)
    .sort((a, b) => {
      if (a.toLowerCase() > b.toLowerCase()) return 1;
      if (a.toLowerCase() < b.toLowerCase()) return -1;
      else return 0;
    });
 
  // elimino duplicados
  const gamesNameFilter = [...new Set(gamesName)];

  //guardo en un array los juegos x nombre y le asigno la cantidad = 1
  const similarGames = [];
 gamesNameFilter.forEach((el) => similarGames.push({name: el, quantity: 1}));
 
  // cuento la cantidad de juegos similares que están repetidos
  for(let i = 0; i < gamesName?.length; i++){
    if(gamesName[i+1] === gamesName[i]){
      similarGames.map((el) => el.name === gamesName[i] && ++el.quantity)
    }
  } 

  // ordeno según mayor coincidencia de géneros  y devuelvo los primeros 6 juegos
  const suggestedList = similarGames.sort((a, b) => b.quantity - a.quantity 
  || a.name.includes(name) ? -1 : b.name.includes(name) ? 1 : 0
  ).slice(0, 6)
  console.log('suggestedList=>', suggestedList)

  //busco las demás propiedades de los juegos similares para renderizarlos
  const suggestedGames = suggestedList.map((game) => similar.find((el) => el.name === game.name))
  console.log('suggestGames=>', suggestedGames )   
 
  return (
    <div>
      {suggestedGames?.map((el) => (
        <Game
           image={el.image}
           name={el.name}
           rating={el.rating}
           genres={el.genres}
        />
      ))}
    </div>
  );
};

export default SimilarGames;
