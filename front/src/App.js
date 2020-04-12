import React from 'react';
import logo from './logo.svg';
import './App.css';
import Authentication from './Authentication/Authentication';
import './css/bulma.css'
import CardSearcher from './CardSearcher/CardSearcher';
import CardDetails from './CardDetails/CardDetails';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>

      <Route path="/" component={CardSearcher}></Route>
      <Route path="/auth" exact component={Authentication}></Route>
      <Route path="/card/:id" component={CardDetails}></Route>


    </Router>
  );
}

export default App;
