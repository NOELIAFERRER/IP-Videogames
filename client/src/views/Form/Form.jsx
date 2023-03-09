import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import Select from 'react-select'
import { getAllGames, addGame } from "../../redux/actions";
import styles from "../Form/Form.module.css";

const Form = ({ name, description, released, rating, image }) => {
  const allGames = useSelector((state) => state.allGames);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    image:"",
    genres:[],
    platforms: []
  });

  const [error, setError] = useState({});
  //    {
  //    name: '',
  //    // description: ''
  // })



  //Guardo en un array los géneros de cada juego)
  const allGen = allGames.map((g) => g.genres).flat();
  //   Elimino los valores repetidos y ordeno alfabéticamente
  const allGenres = [...new Set(allGen)].sort((a, b) => {
    if (a.toLowerCase() > b.toLowerCase()) return 1;
    if (a.toLowerCase() < b.toLowerCase()) return -1;
    else return 0;
  });

  //Guardo en un array las plataformas de cada juego)
  const allPlat = allGames.map((g) => g.platforms).flat();
  //   Elimino los valores repetidos y ordeno alfabéticamente
  const allPlatforms = [...new Set(allPlat)].sort((a, b) => {
    if (a.toLowerCase() > b.toLowerCase()) return 1;
    if (a.toLowerCase() < b.toLowerCase()) return -1;
    else return 0;
  });

  console.log("platforms:", allPlatforms);

  useEffect(() => {
    if (!allGames.length) dispatch(getAllGames());
  }, [dispatch, allGames.length]);

  const validateInput = (input) => {
    console.log(input.name);
    let errorForm = {};
    if (input.name.length < 4 || typeof input.name !== "string")
      errorForm.name = "Se debe ingresar un nombre válido";
    if (input.description.length < 10 || typeof input.description !== "string")
      errorForm.description = "Se deben ingresar al menos 20 caracteres";
    // const regExp = /^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/
    // if(!input.released.match(regExp)) errorForm.released = 'Se debe ingresar YYYY-MM-DD'
    const dateSplited = input.released.split("-");
    console.log(input.released);
    console.log(dateSplited);
    if (
      input.released.length < 1 ||
      isNaN(dateSplited[0]) ||
      isNaN(dateSplited[1]) ||
      isNaN(dateSplited[2])
    )
      errorForm.released = "Se debe ingresar una fecha con formato YYYY-MM-DD";
    if (!input.rating.length || isNaN(input.rating))
      errorForm.rating = "Se debe ingresar un número entero del 1 al 5";
    console.log(error);
    return errorForm;
  };

  const validateSelect = (input) => {
    let repeated = null;
    for (let i = 0; i < input.length; i++) {
      for (let j = 1; j < input.length - 1; j++) {
        repeated = input.find((el) => input[i] === input[j]);
        if (repeated !== null) setError("Esta opción ya fue ingresada");
        else {
          setError("");
        }
      }
    }
  };

  const changeHandler = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value);
    console.log(event.target.name);
    setError(validateInput(input));
  };

  const changeGenresHandler = (event) => {
    setInput({
      ...input,
      // [event.target.name]: [...new Set([...input.genres, event.target.value])] pruebo haciendo un array!!
      [event.target.name]: [...input.genres, event.target.value],
    });
    console.log(event.target.value);
    console.log(input);
    validateSelect(input.genres);
  };

  const changePlatformsHandler = (event) => {
    setInput({
      ...input,
      [event.target.name]: [...input.platforms, event.target.value],
    });
    console.log(input);
    validateSelect(input.platforms);
  };

  const changeAddHandler = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    validateSelect(input.genres);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    await axios.post("http://localhost:3001/videogames", input);
    // dispatch(addGame())
    console.log(input);
    setInput({
      name: "",
      image:"",
      description: "",
      released: "",
      rating: "",
      genres:[],
      platforms: [],
    });
    alert("Datos enviados correctamente");
  };

  return (
    <div className={styles.container}>
      <h3>AGREGAR VIDEOJUEGO</h3>
      <form onSubmit={submitHandler}>
        <div className={styles.inner}>
          <label htmlFor="nam">NOMBRE</label>
          <input
            type="text"
            id="nam"
            name="name"
            onChange={changeHandler}
            value={input.name}
          />
          {error.name && <p>{error.name}</p>}
        </div>
        <div className={styles.inner}>
          <label htmlFor="des">DESCRIPCION</label>
          <input
            type="text"
            id="des"
            name="description"
            onChange={changeHandler}
            value={input.description}
          />
          {error.description && <p>{error.description}</p>}
        </div>
        <div className={styles.inner}>
          <label htmlFor="">FECHA DE LANZAMIENTO</label>
          <input
            type="text"
            datepicker="true"
            datepicker_format="YYYY-MM-YY"
            // data-date-format='YYYY-MM-DD'
            id="rel"
            name="released"
            placeholder="YYYY-MM-DD"
            onChange={changeHandler}
            value={input.released}
          />
          {error.released && <p>{error.released}</p>}
        </div>
        <div className={styles.inner}>
          <label htmlFor="rat">RATING</label>
          <input
            type="text"
            id="rat"
            name="rating"
            onChange={changeHandler}
            value={input.rating}
          />
          {error.rating && <p>{error.rating}</p>}
        </div>

        <div className={styles.inner}>
          <label htmlFor="img">IMAGEN</label>
          <input type="text" id="img" name="image" onChange={changeHandler} value={input.image} />
        </div>

        <div className={styles.select}>
          <label htmlFor="gen">GENEROS </label>

          <select
            name="genres"
            id="gen"
            onChange={changeGenresHandler}
            multiple={true}
          >
            {allGenres.map((el) => (
              <option value={`${el}`}>{el}</option>
            ))}
          </select>
          {/* <input type='text' id='gen' onChange={changeGenresHandler} value={input.genres}/> */}
          {/* <label htmlFor='add'>AGREGAR GENERO</label> */}
          <input
            type="text"
            id="add"
            name="genres"
            onChange={changeHandler}
            value={input.genres}
          />
          {/* <input type='checkbox' id='add' name='add genres' onChange={changeCheckHandler} /> */}
          <div className={styles.select}>
            <label htmlFor="pla">PLATAFORMAS </label>
            <select
              name="platforms"
              id="pla"
              onChange={changePlatformsHandler}
              multiple={true}
            >
              {allPlatforms.map((el) => (
                <option value={`${el}`}>{el}</option>
              ))}
            </select>
            <input
              type="text"
              id="plat"
              name="platforms"
              onChange={changeAddHandler}
              value={input.platforms}
            />
          </div>
          <br />
          <button className={styles.btn} type="submit" disable={error}>
            CREATE
          </button>
        </div>
      </form>
      <div>{/* {error && <p>{error}</p>} */}</div>
    </div>
  );
};

export default Form;