import React, { useEffect } from "react";
import Game from "../Game/Game";
import { getAllGames} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const SimilarGames = ( {similar}) => {

//     const allGames = useSelector((state) => state.allGames)
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if(!allGames.length)
//     dispatch(getAllGames())
//   }, [dispatch])


//  const similar = genres?.map(genre => allGames.filter(game => game.genres.includes(genre))).flat();
//   console.log('similar => ', similar)

// const gameListed = {};
// similar.forEach((el) => {
//   if(!gameListed[el]){
//     gameListed[el] = 1
//   } else {
//      gameListed[el] ++
//   }
// });


// const gamesListed = []
// for(const el in gameListed) {
//   gamesListed.push({el, gameListed: gameListed[el]})
// }

// //ordeno
// gamesListed.sort((a,b) => b.gameListed - a.gameListed)

// const similarGames = [];
// gamesListed.forEach((el) => {
//   for(let i = 0; i < el.gameListed; i++){
//     similarGames.push(Number(el.gameListed))
//   }
// });

// console.log('similarGames => ', similarGames)


  return (
    <div>
      {similar?.map(el => (
     
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
