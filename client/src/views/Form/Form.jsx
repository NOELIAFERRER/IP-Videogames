import axios from "axios";
import React, { useState, useEffect } from "react";
//redux
import { useSelector, useDispatch } from "react-redux";
import { getGenres, getPlatforms } from "../../redux/actions";
//sytles
import styles from "../Form/Form.module.css";

const Form = () => {
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
          <div className={styles.input}>
            <label htmlFor="nam">NAME</label>
            <input
              type="text"
              id="nam"
              name="name"
              onChange={changeHandler}
              value={input.name}
            />
            {error.name && <p>{error.name}</p>}

            <label htmlFor="des">DESCRIPTION</label>
            <input
              type="text"
              id="des"
              name="description"
              onChange={changeHandler}
              value={input.description}
            />
            {error.description && <p>{error.description}</p>}

            <label htmlFor="">RELEASED DATE</label>
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

            <label htmlFor="rat">RATING</label>
            <input
              type="text"
              id="rat"
              name="rating"
              onChange={changeHandler}
              value={input.rating}
            />
            {error.rating && <p>{error.rating}</p>}

            <label htmlFor="img">IMAGE</label>
            <input
              type="text"
              id="img"
              name="image"
              onChange={changeHandler}
              value={input.image}
            />
          </div>

          <div className={styles.selection}>
            <label htmlFor="gen">GENRES </label>
            <select
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
              // type="text"
              type="hidden"
              id="add"
              name="genres"
              onChange={changeHandler}
              // value={input.genres}
            />

            {input.genres?.map((g, key) => (
              <button>{g}</button>
            ))}

            <label htmlFor="pla">PLATFORMS </label>

            <select
              name="platforms"
              id="pla"
              onChange={changePlatformsHandler}
              multiple={true}
            >
              {platforms.map((el, key) => (
                <option value={`${el}`}>{el}</option>
              ))}
            </select>

            <input
              // type="text"
              type="hidden"
              id="plat"
              name="platforms"
              onChange={changeAddHandler}
              // value={input.platforms}
            />

            {input.platforms?.map((p, key) => (
              <button>{p}</button>
            ))}

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
