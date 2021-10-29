import React from "react"
import { NavLink } from "react-router-dom"
import styles from "./Navbar.module.css"
import {MdOutlinePets} from "react-icons/md"
import Order from "../order/Order"
import SearchBar from "./SearchBar"

export default function Nav(){
    return(
        <header >
            <nav className={styles.NavBar} >
                <NavLink exact to ="/" className={styles.linkpet}>
                    <MdOutlinePets/>
                </NavLink>
               
                    <NavLink to="/dogs" className={styles.link}>Dogs</NavLink>
                    <NavLink to="/dogs/create" className={styles.link}>Create Dogs</NavLink>
            </nav>
            <div className={styles.SearchBar}>
                <SearchBar/>
            </div>
            <div>
                <Order />
            </div>

        </header>
    )
}

