import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home/Home';
import NavBar from './routes/NavBar/NavBar';
import SignIn from './routes/SignIn/SignIn';

function App() {
  return (
    <Routes>
      <Route path='/' element={<NavBar />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Home />} />
        <Route path='sign-in' element={<SignIn />} />
      </Route>
    </Routes>
  );
}

export default App;
