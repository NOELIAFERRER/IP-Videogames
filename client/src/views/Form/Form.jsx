import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Details from "../../components/Details/Details";
// import GameDetail from "../../components/GameDetail/GameDetail";
// import Select from 'react-select'
import { getGenres, getPlatforms } from "../../redux/actions";
import styles from "../Form/Form.module.css";

const Form = () => {
  // const allGames = useSelector((state) => state.allGames);
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    image: "",
    genres: [],
    platforms: [],
  });

  const [error, setError] = useState({});

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPlatforms());
  }, [dispatch]);

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
      // [event.target.name]: [...new Set([...input.genres, event.target.value])] // pruebo haciendo un array!!
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
    await axios.post("/videogames", input);
    // dispatch(addGame())
    console.log(input);
    setInput({
      name: "",
      image: "",
      description: "",
      released: "",
      rating: "",
      genres: [],
      platforms: [],
    });
    alert("Datos enviados correctamente");
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2 className={styles.title}>CREATE VIDEOGAME</h2>
        <form onSubmit={submitHandler}>
          <div className={styles.inner}>
            <label className={styles.label} htmlFor="nam">
              NAME
            </label>
            <input
              className={styles.input}
              type="text"
              id="nam"
              name="name"
              onChange={changeHandler}
              value={input.name}
            />
            {error.name && <p>{error.name}</p>}
          </div>
          <div className={styles.inner}>
            <label className={styles.label} htmlFor="des">
              DESCRIPTION
            </label>
            <input
              className={styles.input}
              type="text"
              id="des"
              name="description"
              onChange={changeHandler}
              value={input.description}
            />
            {error.description && <p>{error.description}</p>}
          </div>
          <div className={styles.inner}>
            <label className={styles.label} htmlFor="">
              RELEASED DATE
            </label>
            <input
              className={styles.input}
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
            <label className={styles.label} htmlFor="rat">
              RATING
            </label>
            <input
              className={styles.input}
              type="text"
              id="rat"
              name="rating"
              onChange={changeHandler}
              value={input.rating}
            />
            {error.rating && <p>{error.rating}</p>}
          </div>

          <div className={styles.inner}>
            <label className={styles.label} htmlFor="img">
              IMAGE
            </label>
            <input
              className={styles.input}
              type="text"
              id="img"
              name="image"
              onChange={changeHandler}
              value={input.image}
            />
          </div>

          <div className={styles.selection}>
            <label className={styles.label} htmlFor="gen">
              GENRES{" "}
            </label>
            <select
              className={styles.selector}
              name="genres"
              id="gen"
              onChange={changeGenresHandler}
              multiple={true}
            >
              {genres.map((el, key) => (
                <option value={`${el}`}>{el}</option>
              ))}
            </select> 
            <input
              // className={styles.inputSelector}
              // type="text"
              type="hidden"
              id="add"
              name="genres"
              onChange={changeHandler}
              // value={input.genres}
            />
            <div className={styles.inputSelector}>
              {input.genres?.map((g, key) => (
                <button className={styles.itemsSelected}>*{g}</button>
              ))}
            </div>
          </div>
          <div className={styles.selection}>
            <label className={styles.label} htmlFor="pla">
              PLATFORMS{" "}
            </label>
            {/* <div className={styles.select}> */}
            {/* <div className={styles.ctor}> */}
            <select
              className={styles.selector}
              name="platforms"
              id="pla"
              onChange={changePlatformsHandler}
              multiple={true}
            >
              {/* {allPlatforms.map((el, key) => ( */}
              {platforms.map((el, key) => (
                <option value={`${el}`}>{el}</option>
              ))}
            </select>
            {/* </div> */}
            <div className={styles.inputSelected}>
              <input
                // className={styles.inputSelector}
                // type="text"
                type="hidden"
                id="plat"
                name="platforms"
                onChange={changeAddHandler}
                // value={input.platforms}
              />
              <div className={styles.inputSelector}>
                {input.platforms?.map((p, key) => (
                  <button className={styles.itemsSelected}>*{p}</button>
                ))}
              </div>
            </div>
            <br />
            <button className={styles.btn} type="submit" disable={error}>
              CREATE
            </button>
          </div>
        </form>
      </div>
      
      {/******* AQUI QUIERO MOSTRAR LA CARD DEL JUEGO CREADO ********
      
      <div className={styles.gameCard}>
        {
          <Details
            image={input.image}
            name={input.name}
            genres={input.genres}
            description={input.description}
            released={input.released}
            rating={input.rating}
            platforms={input.platforms}
          />
        }
      </div> */}
    </div>
  );
};

export default Form;
