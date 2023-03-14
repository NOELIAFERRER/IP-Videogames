import React, { useState } from "react";
import { useDispatch, useEffect } from 'react-redux'
import styles from './Navbar.module.css'
import { Link } from "react-router-dom";
import { getGameByName } from "../../redux/actions";


const Navbar = () => {
    const dispatch = useDispatch()

    const [input, setInput] = useState('');

    const onChangeHandler = (event) => {
        event.preventDefault();
        setInput(event.target.value)
        console.log(input)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (input !== '') dispatch(getGameByName(input))
        console.log(input)
        setInput('')
    }

    return (
        <div className={styles.container}>
            <div className={styles.links}>
                <ul>
                    <Link to='/games'>
                        <button className={styles.navigate}>HOME</button>
                    </Link>
                    <Link to='/games/post'>
                        <button className={styles.navigate}>CREATE</button>
                    </Link>
                    {/* <NavLink activeClassName={styles.sections} to='/games'>Home</NavLink> */}
                    {/* <NavLink activeClassName={styles.sections} to='/games/post'>Form</NavLink> */}
                </ul>
            </div>
            <div className={styles.searchBar}>
                <input
                    className={styles.input}
                    type='text'
                    placeholder='Nombre...'
                    value={input}
                    onChange={(e) => onChangeHandler(e)}
                />
                <button
                    className={styles.btn}
                    type='submit'
                    value='BUSCAR'
                    onClick={(e) => onSubmitHandler(e)}

                >BUSCAR</button>
                {/* /> */}
            </div>

        </div>
    )
}

export default Navbar;