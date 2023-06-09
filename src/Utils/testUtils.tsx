import React from 'react'
import {RenderOptions, render } from '@testing-library/react'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { RootState, rootReducer } from '../Store/rootReducer';
import { createStore } from 'redux';
import { CATEGORIES_INITIAL_STATE } from '../Store/categories/categories.reducer';
import { USER_INITIAL_STATE } from '../Store/user/user.types';
import { CART_INITIAL_STATE } from '../Store/cart/cart.reducer';

interface WrapperProps {
  children: React.ReactNode
}

interface RenderWithProvidersOptions {
  preloadedState?: RootState;
  store?: any;
  renderOptions?: RenderOptions;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {
      user: USER_INITIAL_STATE,
      categories: CATEGORIES_INITIAL_STATE,
      cart: CART_INITIAL_STATE
    },
    // Automatically create a store instance if no store was passed in
    store = createStore(rootReducer, preloadedState),
    ...renderOptions
  }: RenderWithProvidersOptions = {}
) {
  const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}