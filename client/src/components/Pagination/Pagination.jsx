import React from "react";
import styles from '../Pagination/Pagination.module.css'


const Pagination = ({ paging, games, gamesXPage }) => {
    const pages = [];
    for (let i = 1; i <= Math.ceil(games / gamesXPage); i++) {
        pages.push(i);
    }
    return (
        <nav className={styles.pages}>
            <ul>
                {pages.map(number => (
                    <button className={styles.btn} onClick={() => paging(number)}>{number}</button>
                ))}
            </ul>
        </nav>
    )
}
export default Pagination;

