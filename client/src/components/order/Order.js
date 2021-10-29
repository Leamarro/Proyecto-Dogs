import React, {useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAZ, getZA, getWeight, getSource, filterTemp, getTemperaments } from '../../actions'
import styles from './order.module.css';


export default function Order() {

    const temperaments = useSelector(state => state.temperaments)
    const allDogs = useSelector(state => state.dogsToShow)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTemperaments())
            }, [])


    //a-z
    let orderAsc = (e) => {
        e.preventDefault()
        dispatch(getAZ())
    }
    //z-a
    let orderDesc = (e) => {
        e.preventDefault()
        dispatch(getZA())
    }

    //menor peso
    let orderWeight = (e, orden) => {
        e.preventDefault()
        dispatch(getWeight(orden))
    }

    //temp
    function handleChange(e) {
        const selectedTemp = e.target.value;

        let filtered = [];
        console.log("value selc: ",e.target.value)

        allDogs?.forEach((breed) => {
            if (breed.id.length) {
                breed.temperaments.map(temp => {
                    console.log('temp.name',temp.name)
                   return temp.name === selectedTemp ? filtered.push(breed) : null
                })
            } else {
                if (breed.temperament?.includes(selectedTemp)) {
                    filtered.push(breed)
                    console.log('incluye', breed)
                } else {
                    console.log('nada')
                }

            }
        })
        console.log("filtered: ", filtered)
        dispatch(filterTemp(filtered))
    }


    //origen api / DB
    function handleSelect(e) {
        if (e.target.value === "null") {
            return alert("Please insert a valid value");
        } else {
            dispatch(getSource(e.target.value));
        }
    }

    return(
        <div className={styles.order}>
            <div className={styles.byName}>
                <label>By Name:</label>
                <button onClick={(e) => orderAsc(e)}>A-Z</button>
                <button onClick={(e) => orderDesc(e)}>Z-A</button>
            </div>
            <div className={styles.byWeight}>
                <label>By Weight</label>
                <button onClick={(e) => orderWeight(e, 'ASC')}>Asc</button>
                <button onClick={(e) => orderWeight(e, 'DES')}>Des</button>
            </div>
            <div className={styles.byForm} >
                <form >
                <label>Filter by </label>
                <select onChange={handleSelect}>
                    <option value="null">Source</option>
                    <option value="DB">DB</option>
                    <option value="API">API</option>
                    <option value="ALL">ALL</option>
                </select>
                </form>
            </div>
            <div className={styles.byTemps}>
                <label>Filter by temps</label> <br/>
                <select onChange={handleChange} name="temperaments">
                    {temperaments?.map(temp => {
                        return(
                            <option key = {temp} value={temp}>{temp}</option>
                        )
                    })}
                </select>
            </div>
        </div>
    )
}