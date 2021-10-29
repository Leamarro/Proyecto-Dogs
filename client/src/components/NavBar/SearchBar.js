import React, { useState,  } from 'react';
import { useDispatch } from 'react-redux';
import { getDogs } from "../../actions";
import style from './SearchBar.module.css';

export default function SearchBar() {

    //local state
    const [searchDog, setSearchDog] = useState("");
    const dispatch = useDispatch();  
    
    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getDogs(searchDog));
        setSearchDog("");
    }
    
    return (
        <div className={style.searchbar}>
            <input className={style.input}
                type='text'
                placeholder='Search here!'
                value = {searchDog}
                onChange={ (event) => setSearchDog(event.target.value) }
            />                
            <button onClick={handleClick} type='submit' className={style.submit}>
                Search
            </button>
        </div>
    )
};