import { CATEGORY_ACTION_TYPES, Category, Product } from "./categories.types";

import {
  createAction,
  Action,
  withMatcher,
  ActionWithPayload,
} from "../../Utils/Reducer/reducer";

export type FetchCategoriesStart =
  Action<CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START>;

export type FetchCategoriesSuccess = ActionWithPayload<
CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
Map<string, Product[]>
>;

export type FetchCategoriesFailed = ActionWithPayload<
CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILURE,
  Error
>;

export const fetchCategoriesStart = withMatcher(() =>
  createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START)
);

export const fetchCategoriesSuccess = withMatcher(
  (categoriesArray: Map<string, Product[]>) =>
    createAction(
      CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
      categoriesArray
    )
);

export const fetchCategoriesFailed = withMatcher((error: Error) =>
  createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILURE, error)
);