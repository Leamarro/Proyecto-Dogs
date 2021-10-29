import React from 'react'
import { Route, Switch} from 'react-router-dom'
import './App.css';

import LandingPage from './components/LandingPage/LandingPage.js'
import CreateDog from './components/DogCreator/CreateDog'
import {Dogs} from './components/Home/Dogs.js'
import DogDetails from './components/Home/DogDetails'
import Nav from './components/NavBar/Nav.js'


function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/dogs/details/:id" component={DogDetails} />
      <Route path='/dogs' component={Nav} />
    <Switch>
      <Route exact path="/dogs/create" component={CreateDog} />
      <Route path="/dogs/:search" component={Dogs} />
      <Route path="/dogs" component={Dogs} />
    </Switch>
  </div>
  );
}

export default App;
