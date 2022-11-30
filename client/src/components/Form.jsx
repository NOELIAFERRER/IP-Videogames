import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
// import Select from 'react-select'
import { getGenres, getPlatforms, getAllGames } from "../redux/actions";
import styles from '../styles/Form.module.css';


const Form = ({ name, description, released, rating }) => {
   const [input, setInput] = useState({
      name: '',
      description: '',
      released: '',
      rating: '',
      genres: '',
      platforms: ''
   })

   const [error, setError] = useState({})
   //    {
   //    name: '',
   //    // description: ''
   // })

   const allGenres = useSelector(state => state.genres);
   const allGames = useSelector(state => state.allGames);
   // console.log(allGenres)
   const allPlatforms = useSelector(state => state.platforms);
   // console.log(allPlatforms)

   const dispatch = useDispatch();

   useEffect(() => {
      if (!allGames.length) dispatch(getAllGames())
      dispatch(getGenres())
      dispatch(getPlatforms())
   }, [dispatch, allGames.length]);


   const validateInput = (input) => {
      console.log(input.name)
      let errorForm = {}
      if (input.name.length < 4 || typeof input.name !== "string") errorForm.name = 'Se debe ingresar un nombre válido'
      if (input.description.length < 10 || typeof input.description !== 'string') errorForm.description = 'Se deben ingresar al menos 20 caracteres'

      // : (!input.released) setError('Se debe ingresar fecha de lanzamiento')
      // if(!input.rating) setError('Se debe ingresar una puntuación de rating')
      // else{ setError('')}
      console.log(error)
      return errorForm;
   }

   const validateSelect = (input) => {
      let repeated = null;
      for (let i = 0; i < input.length; i++) {
         for (let j = 1; j < input.length - 1; j++) {
            repeated = input.find(el => input[i] === input[j])
            if (repeated !== null) setError('Esta opción ya fue ingresada')
            else { setError('') }
         }
      }
   }

   const changeHandler = (event) => {
      setInput({
         ...input,
         [event.target.name]: event.target.value
      })
      console.log(event.target.value)
      console.log(event.target.name)
      setError(validateInput(input))
   }

   const changeGenresHandler = (event) => {
      setInput({
         ...input,
         [event.target.name]: [...new Set([...input.genres, event.target.value])]
      })
      validateSelect(input.genres)
   }

   const changePlatformsHandler = (event) => {
      setInput({
         ...input,
         [event.target.name]: [...new Set([...input.platforms, event.target.value])]
      })
      validateSelect(input.platforms)
   }

   const changeAddHandler = (event) => {
      setInput({
         ...input,
         [event.target.name]: event.target.value
      })
      validateSelect(input.genres)
   }

   const submitHandler = async (event) => {
      event.preventDefault();
      await axios.post('http://localhost:3001/videogames', input);
      console.log(input)
      setInput({
         name: '',
         description: '',
         released: '',
         rating: '',
         genres: '',
         platforms: ''
      })
      alert('Datos enviados correctamente')
   }

   return (
      <div className={styles.container}>
         <h3>AGREGAR VIDEOJUEGO</h3>
         <form onSubmit={submitHandler}>
            <div className={styles.inner}>
               <label htmlFor='nam'>NOMBRE</label>
               <input type="text" id='nam' name='name' onChange={changeHandler} value={input.name} />
               {error.name && <p>{error.name}</p>}
            </div>
            <div className={styles.inner}>
               <label htmlFor='des'>DESCRIPCION</label>
               <input type="text" id='des' name='description' onChange={changeHandler} value={input.description} />
               {error.description && <p>{error.description}</p>}
            </div>
            <div className={styles.inner}>
               <label htmlFor=''>FECHA DE LANZAMIENTO</label>
               <input type='text' id='rel' name='released' placeholder='dd/mm/aa' onChange={changeHandler} value={input.released} />
            </div>
            <div className={styles.inner}>
               <label htmlFor='rat'>RATING</label>
               <input type='text' id='rat' name='rating' onChange={changeHandler} value={input.rating} />
            </div>

            <div className={styles.inner}>
               <label htmlFor='img'>IMAGEN</label>
               <input type="text" id='img' name='image' value={input.image} />
            </div>

            <div className={styles.select}>
               <label htmlFor='gen'>GENEROS </label>

               <select name='genres' id='gen' onChange={changeGenresHandler} multiple={true} defaultValue='[]'>
                  {
                     allGenres.map(el => <option value={`${el}`}>{el}</option>)
                  }
               </select>
                    {/* <input type='text' id='gen' onChange={changeGenresHandler} value={input.genres}/> */}
               {/* <label htmlFor='add'>AGREGAR GENERO</label> */}
               <input type="text" id='add' name='genres' onChange={changeAddHandler} value={input.genres} />
               {/* <input type='checkbox' id='add' name='add genres' onChange={changeCheckHandler} /> */}
               <div className={styles.select}>
                  <label htmlFor='pla'>PLATAFORMAS </label>
                  <select name='platforms' id='pla' onChange={changePlatformsHandler} multiple={true} defaultValue='[]'>
                     {
                        allPlatforms.map(el => <option value={`${el}`}>{el}</option>)
                     }
                  </select>
                  <input type='text' id='plat' onChange={changeAddHandler} value={input.platforms} />
               </div>
               <br />
               <button className={styles.btn} type='submit' disable={error}>CREAR</button>
            </div>
         </form >
         <div>
            {/* {error && <p>{error}</p>} */}
         </div>
      </div >
   )
}

export default Form