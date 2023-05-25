import { AnyAction } from 'redux';
import { Product } from "./categories.types";
import { fetchCategoriesFailed, fetchCategoriesStart, fetchCategoriesSuccess } from './categories.actions';

export type CategoriesState = {
    categories: Map<string, Product[]>;
    isLoading: boolean;
    error: any;
}

export const CATEGORIES_INITIAL_STATE = {
    categories: new Map<string, Product[]>(),
    isLoading: false,
    error: null
}

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {} as AnyAction): CategoriesState => {

    if (fetchCategoriesStart.match(action)) {
        return { ...state, isLoading: true };
      }
    
      if (fetchCategoriesSuccess.match(action)) {
        return { ...state, categories: action.payload, isLoading: false };
      }
    
      if (fetchCategoriesFailed.match(action)) {
        return { ...state, error: action.payload, isLoading: false };
      }
    
      return state;

}
