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
                {/* <h3>VIDEOGAMES LAND</h3> */}
                <NavLink to='/games'>
                    <button className= {styles.btn}>INGRESAR</button>
                </NavLink>
            </div>
        )
    }
}

export default Landing;