import React from 'react';
import logo from './logo.svg';
import './App.css';
import Authentication from './Authentication/Authentication';
import './css/bulma.css'
import CardSearcher from './CardSearcher/CardSearcher';

function App() {
  return (
    <div className="App">
      <CardSearcher></CardSearcher>
      <Authentication />
    </div>
  );
}

export default App;
