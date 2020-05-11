import React from 'react';
import logo from './logo.svg';
import './App.css';
import Authentication from './Authentication/Authentication';
import './css/bulma.css'
import CardSearcher from './CardSearcher/CardSearcher';
import CardDetails from './CardDetails/CardDetails';
import DeckDetails from './DeckDetails/DeckDetails';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core';
import DeckList from './DeckList/DeckList';
import Navbar from './Navbar/Navbar';



function App() {
  return (
    <Router>
      <Navbar></Navbar>

      <Route path="/auth" exact component={Authentication}></Route>
      <Route path="/card/:id" component={CardDetails}></Route>
      <Route path="/deck-list" component={DeckList}></Route>
      <Route path="/deck/:id" component={DeckDetails}></Route>

    </Router>
  );
}

export default App;
