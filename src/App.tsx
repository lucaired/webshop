import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home/Home';
import NavBar from './routes/NavBar/NavBar';
import SignIn from './routes/SignIn/SignIn';
import Shop from './components/Shop/Shop';


function App() {
  return (
    <Routes>
      <Route path='/' element={<NavBar />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='sign-in' element={<SignIn />} />
      </Route>
    </Routes>
  );
}

export default App;
