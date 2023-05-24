import { RootState } from "../rootReducer";
import { Product } from "./categories.types";

// please type the selector return value
export const selectCategories = (state: RootState): Map<string, Product[]> => state.categories.categories;
