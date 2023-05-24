import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from '@redux-devtools/extension';
import logger from 'redux-logger';

import { rootReducer } from "./rootReducer";

const middlewares = [logger];

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));