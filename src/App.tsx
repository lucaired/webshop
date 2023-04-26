import { useContext } from 'react';

import './App.css';
import { Routes, Route } from 'react-router-dom';
import SignIn from './Routing/SignIn/SignIn';
import NavBar from './Routing/NavBar/NavBar';
import Home from './Routing/Home/Home';
import Shop from './Components/Shop/Shop';
import Checkout from './Components/Checkout/Checkout';
import { LocalUserContext } from './Contexts/LocalUserContext';
import { CartContext } from './Contexts/CartContext';

function App() {
  const { localUser } = useContext(LocalUserContext);
  const { cartItemsCount} = useContext(CartContext);

  return (
    <Routes>
      <Route path='/' element={<NavBar />}>
        <Route index element={<Home />} />
        <Route path='home' element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='sign-in' element={!localUser ? <SignIn /> : <Home />} />
        <Route path='checkout' element={cartItemsCount > 0 ? <Checkout /> : <Home />} />
      </Route>
    </Routes>
  );
}

export default App;


