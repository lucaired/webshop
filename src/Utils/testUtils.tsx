import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { rootReducer } from "../Store/rootReducer";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";

interface WrapperProps {
  children: React.ReactNode;
}

export function renderWithProviders(
    ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
    {
      preloadedState = {},
      // Automatically create a store instance if no store was passed in
      store = createStore(rootReducer, preloadedState),
      ...renderOptions
    } = {}
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

