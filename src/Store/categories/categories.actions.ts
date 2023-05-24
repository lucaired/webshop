import { CATEGORY_ACTION_TYPES } from "./categories.types";
import { createAction } from "../../Utils/Reducer/reducer";
import { Product } from "./categories.reducer";

export const setCategories = (categories: Map<string, Product[]>) =>
    createAction(CATEGORY_ACTION_TYPES.SET_CATEGORIES, categories);