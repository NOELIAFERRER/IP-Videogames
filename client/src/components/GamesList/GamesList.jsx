import React, { useEffect } from "react";
import Game from "../Game/Game";
import { getAllGames} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const GamesList = ({ genres }) => {

  // const similarGames = useSelector((state) => state.similarGames);
  // const dispatch = useDispatch();
  // console.log("genres => ", genres);

  // useEffect(() => {
  //   dispatch(getSimilarGames(genres));
  // }, [dispatch, genres]);

  // console.log("similarGames:", similarGames);

  const allGames = useSelector((state) => state.allGames)
  const dispatch = useDispatch();

  useEffect(() => {
    if(!allGames.length)
    dispatch(getAllGames())
  }, [dispatch])


 const similar = genres?.map(genre => allGames.filter(game => game.genres.includes(genre))).flat();
  console.log('similar => ', similar)
  // const similarGames = similar.flat()

  return (
    <div>
      {/* {similarGamesList?.map(el => ( */}
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

export default GamesList;
