import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './Pages/Landing.js';
import Code from './Pages/Linemanride.js';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Landing />} />
        <Route path="/Linemanride" element={<Code />} />
      </Routes>
    </div>
  );
}

export default App;