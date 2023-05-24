import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import SignIn from './Routing/SignIn/SignIn';
import NavBar from './Routing/NavBar/NavBar';
import Home from './Routing/Home/Home';
import Shop from './Components/Shop/Shop';
import Checkout from './Components/Checkout/Checkout';
import { getUserDoc, onAuthStateChanged } from './Utils/Firebase/firebase';
import useCategories from './Hooks/useCategories';
import { setCategories } from './Store/categories/categories.actions';
import { selectCartItemsCount } from './Store/cart/cart.selector';
import { setCurrentUser } from './Store/user/user.actions';
import { LocalUser } from './Store/user/user.types';

function App() {

  const dispatch = useDispatch();

  // call useCategories hook to load the categories
  const { categories } = useCategories();

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
          dispatch(setCurrentUser(undefined));
      }
    });

    dispatch(setCategories(categories));

    return unsubscribe;
  }, [dispatch, categories]);

  const cartItemsCount = useSelector(selectCartItemsCount);

  return (
    <Routes>
      <Route path='/' element={<NavBar />}>
        <Route path='/' element={<Home />} />
        <Route path='home' element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='sign-in' element={<SignIn />} />
        <Route path='checkout' element={cartItemsCount > 0 ? <Checkout /> : <Home />} />
      </Route>
    </Routes>
  );
}

export default App;


