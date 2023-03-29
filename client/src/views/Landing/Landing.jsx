import React from "react";
import { NavLink } from "react-router-dom";
//styles
import styles from "../Landing/Landing.module.css";

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={styles.container}>
        {/* <div className={styles.landing}> */}
        <div className={styles.image}>
          {/* <h3>VIDEOGAME API INTRO</h3> */}
        </div>

        <div className={styles.intro}>
          <h3>VIDEOGAME API INTRO</h3>

          <p>Este proyecto consiste en una API de consulta sobre videojuegos.</p>
          <p>
            Dentro de las funcionalidades se pueden realizar búsquedas de juegos
            por nombre, en donde se obtienen resultados de acuerdo a las
            coincidencias con la consulta.
          </p>
          <p>
            Desde la sección "CREATE" se pueden crear juegos adjuntado una
            imagen y todos los datos descriptivos.
          </p>
          <p>
            Desde el home se pueden ORDENAR afabéticamente y por rating de
            manera ascendente o descendente, FILTRAR los resultados por género u
            origen (juegos creados).
          </p>
          <p>
            En caso requerir información más detallada de un juego en particular
            basta con pincharlo y se LINKEARÁ a la ficha con más detalle. Me
            pareció divertido incluir en esa sección descriptiva una lista de
            JUEGOS SIMILARES al consultado, siguiendo la lógica de encontrar
            aquellos juegos que mayor coincidencia de géneros tuviese, además de
            considerar similitudes con el título del juego.
          </p>
          <p>
            Toda la interfaz del usuario, con DISEÑO RESPONSIVE, está
            desarrollada con REACT y CSS puro.
          </p>
          <p>
            El backend fue desarrollado con EXPRESS. La información de cada
            juego se obtiene mediante peticiones a una API externa y también a
            una base de datos creada en POSTGRESQL con metodología CRUD.
          </p>
          <p>El lenguaje: JAVASCRIPT, por supuesto!</p>
        </div>
        <br />
        <NavLink to="/games">
          <button>Next Level</button>
        </NavLink>
      </div>
    );
  }
}

export default Landing;
