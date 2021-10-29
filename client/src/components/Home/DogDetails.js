import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getDogDetails } from '../../actions';
import styles from './DogDetails.module.css';



export default function DogDetails({ match }) {
  console.log(match.params.id)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDogDetails(match.params.id))
  }, [])

  const dogDetailsState = useSelector(state => state.dogDetails);
  console.log('state dd: ', dogDetailsState)

  const [foundDog, setFoundDog] = useState(false)

  console.log("state: ", dogDetailsState)

  useEffect(() => {
    if (dogDetailsState[0]) {
      if (dogDetailsState[0].id === Number(match.params.id) || dogDetailsState[0].id === match.params.id) {
        setFoundDog(true)
      }
    }
  }, [dogDetailsState]);

  if(dogDetailsState[0]){if (dogDetailsState[0].id.length > 4 && dogDetailsState[0].temperaments) {
    dogDetailsState[0].temperament = ""
    for (let i = 0; i < dogDetailsState[0].temperaments.length; i++) {
      dogDetailsState[0].temperament += dogDetailsState[0].temperaments[i].name.toString() + ", "
    }
  }}


  return (
    <div className={styles.dogDetailsPage}>
      <div className={styles.dogDetails}>
        <NavLink exact to="/dogs" className={styles.button}>X</NavLink>
        {foundDog && <div>
          {dogDetailsState[0].image.url ? <img src={dogDetailsState[0].image.url} alt={`${dogDetailsState[0].name}`} /> : <img src={dogDetailsState[0].image} alt={`${dogDetailsState[0].name}`} />}
          <h1>{dogDetailsState[0].name}</h1>
          {dogDetailsState[0].temperament && <h2>Temperament: {dogDetailsState[0].temperament}</h2>}
          <div className={styles.measures}>
            <div className={styles.weight}>
              <h2>Weight</h2>
              <select name="Weight">
                {dogDetailsState[0].weight.imperial
                  ? <option value="1">{dogDetailsState[0].weight.imperial} Lbs.</option>
                  : <option value="1">{dogDetailsState[0].weight}</option>}
                {dogDetailsState[0].weight.metric
                  ? <option value="2">{dogDetailsState[0].weight.metric} Kg.</option>
                  : ""}
              </select>
            </div>

            <div className={styles.height}>
              <h2>Height</h2>
              <select name="Height">
                {dogDetailsState[0].height.imperial
                  ? <option value="1">{dogDetailsState[0].height.imperial} In.</option>
                  : <option value="1">{dogDetailsState[0].height}</option>}
                {dogDetailsState[0].height.metric
                  ? <option value="2">{dogDetailsState[0].height.metric} Cm.</option>
                  : ""}
              </select>
            </div>
          </div>
          {dogDetailsState[0].life_span && <h3>Lifespan: {dogDetailsState[0].life_span}</h3>}
        </div>}
      </div>
    </div>
  )
};