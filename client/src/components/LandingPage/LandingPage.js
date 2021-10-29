import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './LandingPage.module.css';


export default function LandingPage() {
  return (
    <div className={styles.background}>
      <div><h1 className={styles.welcome}>Welcome to <br/> the Dog's World!</h1></div>
      <NavLink exact to="/dogs" className={styles.EntryButton} >Home</NavLink>
      <div className={styles.footer}>
        <footer >
          <h2>Made by Leandro Marrocchi</h2>
        </footer>
      </div>
    </div>
  )
};