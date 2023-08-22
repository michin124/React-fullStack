import logo from './logo.svg';
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Book from './Pages/Book';
import ApInicio from './Apis/ApInicio';
import ApiBook from './Apis/ApiBook';
import ApiSeacrh from './Apis/ApiSearch';
import ApiRegister from './Apis/ApiRegister';
import ApiLogin from './Apis/ApiLogin';
import ApiProfile from './Apis/ApiProfile';
import Categoria from './Pages/Categoria';
import ApiReset from './Apis/ApiReset';

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<ApInicio/>}/>
          <Route exact path="/Cate" element={<Categoria/>}/>
          <Route exact path="/User" element={<ApiProfile/>}/>
          <Route exact path="/Register" element={<ApiRegister/>}/>
          <Route exact path="/Login" element={<ApiLogin/>}/>
          <Route exact path="/Book" element={<ApiBook/>}/>
          <Route exact path="/Search/" element={<ApiSeacrh/>}/>
          <Route exact path="/reset-password" element={<ApiReset/>}/>
          
        </Routes>
      
    </Router>
  );
}

export default App;
