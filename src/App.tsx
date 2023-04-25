import { useContext } from 'react';

import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home/Home';
import NavBar from './routes/NavBar/NavBar';
import SignIn from './routes/SignIn/SignIn';
import Shop from './components/Shop/Shop';
import Checkout from './components/Checkout/Checkout';
import { LocalUserContext } from './contexts/UserContext';
import { CartContext } from './contexts/CartContext';

function App() {
  const { localUser } = useContext(LocalUserContext);
  const { cartItemsCount} = useContext(CartContext);

  return (
    <Routes>
      <Route path='/' element={<NavBar />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='sign-in' element={!localUser ? <SignIn /> : <Home />} />
        <Route path='checkout' element={cartItemsCount > 0 ? <Checkout /> : <Home />} />
      </Route>
    </Routes>
  );
}

export default App;


