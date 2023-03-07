import React from "react";
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { getAllGames } from '../redux/actions'
import styles from '../styles/Videogames.module.css'
import Game from './Game'

class Videogames extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getAllGames()
    }

    render() {
        return (
            <div className={styles.container}>
                {this.props.games ? this.props.games.map(game =>
                    // <Link to='/details'>
                        <Game
                            key={game.id}
                            image={game.image}
                            name={game.name}
                            // genres={game.genres.map((genre, key) =>  genre).join(' | ')}
                            genres={game.genres.map((genre, key) =>  genre)}

                        />
                    // </Link>
                )
                    : <h2>{this.props.error.message}</h2>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        games: state.games,
        error: state.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllGames: () => dispatch(getAllGames())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Videogames);