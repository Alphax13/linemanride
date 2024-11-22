import React, { useState , useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Components/store/store.js';
import Landing from './Pages/Landing.js';
import Code from './Pages/Linemanride.js';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" exact element={<Landing/>} />
          <Route path="/Linemanride" element={<Code />} />
        </Routes>
    </div>
  );
}

export default App;