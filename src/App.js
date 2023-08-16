import logo from './logo.svg';
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/Register" element={<Register/>}/>
          <Route exact path="/Login" element={<Login/>}/>
          <Route exact path="/Book" element={<Home/>}/>

        </Routes>
      
    </Router>
  );
}

export default App;
