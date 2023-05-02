import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';
import { Routes, Route } from 'react-router-dom';
import SignIn from './Routing/SignIn/SignIn';
import NavBar from './Routing/NavBar/NavBar';
import Home from './Routing/Home/Home';
import Shop from './Components/Shop/Shop';
import Checkout from './Components/Checkout/Checkout';
import { CartContext } from './Contexts/CartContext';
import { LocalUser, setCurrentUser } from './Store/user';
import { getUserDoc, onAuthStateChanged } from './Utils/Firebase/firebase';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (user) => {
      if (user) {
        const firebaseUserAuth = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
        } 
        const userDoc = await getUserDoc(firebaseUserAuth);
        if (!userDoc) {
            console.error('No user doc');
            return;
        }
        dispatch(setCurrentUser(new LocalUser(userDoc.displayName || 'No name', userDoc.email || 'No mail', true)));
      } else {
          dispatch(setCurrentUser(null));
      }
    });
    return unsubscribe;
  }, [dispatch]);

  const { cartItemsCount} = useContext(CartContext);

  const localUser: LocalUser = useSelector((state: any) => state.user.currentUser);

  return (
    <Routes>
      <Route path='/' element={<NavBar />}>
        <Route index element={<Home />} />
        <Route path='home' element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='sign-in' element={localUser === null ? <SignIn /> : <Home />} />
        <Route path='checkout' element={cartItemsCount > 0 ? <Checkout /> : <Home />} />
      </Route>
    </Routes>
  );
}

export default App;


