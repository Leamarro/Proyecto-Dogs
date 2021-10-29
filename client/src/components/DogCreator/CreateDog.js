import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import styles from './CreateDog.module.css';
import { getTemperaments } from '../../actions'
import { validate } from "./validation"
import swal from 'sweetalert';

export default function CreateDog() {
  //global state  
  const temperaments = useSelector(state => state.temperaments)

  //local states
  const [input, setInput] = useState({
    name: '',
    minHeight: '',
    maxHeight: '',
    minWeight: '',
    maxWeight: '',
    typeWeight: '',
    typeHeight: '',
    life_span: '',
    image: ''
  })
  const [errors, setErrors] = useState({});
  const [temptsState, setTemptsState] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTemperaments())
  }, [])

  useEffect(() => {
    //gracias a esto podemos modificar cada temp y guardarlo en el estado como un objeto
    var tempts = []
    if (temperaments.length) {
      for (let i = 0; i < temperaments.length; i++) {
        tempts.push({ id: i, name: temperaments[i], checked: false })
      }
    }
    setTemptsState(tempts)
  }, [temperaments])

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value
      }));
  }

  const handleCheckChange = (e) => {
    var checkName = e.target.name
    console.log("Check: ", checkName)
    //busca al temp seleccionado en el estado y lo checkea en true
    for (let i = 0; i < temptsState.length; i++) {
      if (temptsState[i].name === checkName) {
        if (temptsState[i].checked === false) {
          temptsState[i].checked = true
        }
        else {
          temptsState[i].checked = false
        }
      }
    }
    console.log("tempState: ", temptsState)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    var selected = []//aca se van a pushear los temps que esten en true
    for (let i = 0; i < temptsState.length; i++) {
      if (temptsState[i].checked === true) selected.push(temptsState[i].id + 1)
    }
    console.log("selected: ", selected)

    let totalHeight = `${input.minHeight} - ${input.maxHeight}`
    let totalWeight = `${input.minWeight} - ${input.maxWeight}`
    console.log('CreateDog Types of measures: ', input.typeHeight)

    const createdDog = {
      name: input.name,
      height: totalHeight,
      weight: totalWeight,
      life_span: input.life_span + ' years',
      image: input.image,
      temperaments: selected,
    }

    if (Object.keys(errors).length > 0){
      return(
        <div>"Oops!", 'Something went wrong. Please make sure all fields are filled in correctly', "error"</div>
      )
      
    } 

    if (!selected.length){ 

      return (
        <div>"Oops!", 'Should choose at least one temperament!', "error"</div>)
    }

    temptsState.map(e => e.checked === true ? e.checked = false : null)

    setInput({
      name: '',
      minHeight: '',
      maxHeight: '',
      minWeight: '',
      maxWeight: '',
      typeWeight: '',
      typeHeight: '',
      life_span: '',
      image: ''
    })

    await axios.post("http://localhost:3001/dog", createdDog)
      .then("Great!", "Your Dog has been created successfully!", "success")
  };

  return (
    <div className={styles.createDog}>
      <span className={styles.createText}>Create your Dog!</span>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>

          <div className={styles.input} >
            <label>Name</label>
            <input type="text" name="name"
              id="name" value={input.name}
              onChange={handleInputChange} />
          </div>


          <div className={styles.height} >
            <label>Min height</label>
            <input type="number" id="minHeight"
              name="minHeight" value={input.minHeight}
              onChange={handleInputChange} />


            <label>Max height</label>
            <input type="number" id="maxHeight"
              name="maxHeight" value={input.maxHeight}
              onChange={handleInputChange} />

            <select value={input.typeHeight} name='typeHeight' onChange={handleInputChange}>
              <option name='typeHeight' value=" Ft">In</option>
              <option name='typeHeight' value=" Cm">Cm</option>
              <option name='typeHeight' defaultValue value="">Select type</option>
            </select>
            {errors.minHeight && (<div className={styles.error} ><p className={styles.p} >{errors.minHeight}</p></div>)}
            {errors.maxHeight && (<div className={styles.error} ><p className={styles.p} >{errors.maxHeight}</p></div>)}
            {errors.typeHeight && (<div className={styles.error} ><p className={styles.p} >{errors.typeHeight}</p></div>)}
          </div>

          <div className={styles.weight} >
            <label>Min weight</label>
            <input type="number" id="minWeight"
              name="minWeight" value={input.minWeight}
              onChange={handleInputChange} />

            <label>Max weight</label>
            <input type="number" id="maxWeight"
              name="maxWeight" value={input.maxWeight}
              onChange={handleInputChange} />
            <select value={input.typeWeight} name='typeWeight' onChange={handleInputChange}>
              <option name='typeWeight' value=" Lb">Pounds</option>
              <option name='typeWeight' value=" Kg">Kg</option>
              <option name='typeWeight' defaultValue value="">Select type</option>
            </select>
            <br />
            {errors.minWeight && (<div className={styles.error} ><p className={styles.p} >{errors.minWeight}</p></div>)}
            {errors.maxWeight && (<div className={styles.error} ><p className={styles.p} >{errors.maxWeight}</p></div>)}
            {errors.typeWeight && (<div className={styles.error} ><p className={styles.p} >{errors.typeWeight}</p></div>)}
          </div>


          <div className={styles.input} >
            <label>Life Span</label>
            <input type="number" id="life_span"
              name="life_span" value={input.life_span}
              onChange={handleInputChange} /> years
            {errors.life_span && (<div className={styles.error} ><p className={styles.p} >{errors.life_span}</p></div>)}
          </div>

          <div>
            <label>URL Image:</label>
            <input
              className={`${styles.image}`}
              type="text" id='image' name="image"
              placeholder="https://dogs.com/image/yourdogpicture.jpg"
              value={input.image}
              onChange={handleInputChange}
            />
            {errors.image && (<p className={styles.danger}>{errors.image}</p>)}
          </div>
          <br />
          <div className={styles.allTemps}>
            <label>Temperaments:</label>
            {
              temperaments?.map((temp, index) => (
                <div key={index}>
                  <input className={styles.temperaments}
                    type="checkbox"
                    name={temp}
                    onChange={handleCheckChange}
                    value={input.temperaments} />
                  <label>{temp}</label>
                </div>
              ))
            }
          </div>
          {errors.temperaments && (<p className={styles.danger}>{errors.temperaments}</p>)}

          <br />

          {Object.keys(errors).length > 0 || input.name.length === 0
            ? <button type="submit" disabled={true} >Create your Dog!</button>
            : <div>
              <button
                type="submit"
                id="submit"
                className={styles.button}>Create your Dog!</button>
            </div>
          }

        </form>
      </div>
    </div>
  )
}

