import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGameDetails } from "../redux/actions";
import Details from "./Details";
import styles from '../styles/GameDetail.module.css'

const GameDetail = (props) => {
    const gameId = props.match.match.params.id
    const gameDetail = useSelector(state => state.gameDetail);
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGameDetails(gameId))
    }, [dispatch])

    console.log(gameDetail)

    return (
        <div className={styles.container}>
            {/* <h3>Esto es game details</h3>
            <p>{gameId}</p> */}
            <div className={styles.game}>
            {/* { gameDetail.length ?  */}
                <Details 
                    image = {gameDetail.image}
                    name = {gameDetail.name}
                    released = {gameDetail.released}
                    rating = {gameDetail.rating}
                    description = {gameDetail.description}
                    genres = {gameDetail.genres}
                    platforms = {gameDetail.platforms}                
                 />    
                {/* : 'Loading'              */}
            {/* } */}
            </div>
        </div>
    )
}

export default GameDetail;