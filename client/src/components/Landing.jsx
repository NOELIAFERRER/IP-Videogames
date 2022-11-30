import React from "react";
import { NavLink } from 'react-router-dom';
import styles from '../styles/Landing.module.css'


class Landing extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className={styles.landing}>
                <h3>Bienvenidos a Videogames Api</h3>
                <NavLink to='/games'>
                    <button>Home</button>
                </NavLink>
            </div>
        )
    }
}

export default Landing;