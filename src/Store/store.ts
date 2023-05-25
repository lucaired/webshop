import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from '@redux-devtools/extension';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import { rootReducer } from "./rootReducer";

const middlewares = [logger];

const persistConfig = {
    key: 'root',
    storage,
}

const composeEnhancer = (process.env.NODE_ENV !== 'production' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || composeWithDevTools;

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, composeEnhancer(applyMiddleware(...middlewares)));
export const persistor = persistStore(store);
