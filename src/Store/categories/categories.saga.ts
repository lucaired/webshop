import { takeLatest, all, call, put } from 'typed-redux-saga/macro';

import {
    fetchCategoriesSuccess,
    fetchCategoriesFailed,
} from './categories.actions';

import { CATEGORY_ACTION_TYPES, Category, Product } from './categories.types';
import { getCategoriesAndDocuments } from '../../Utils/Firebase/firebase';

export function* fetchCategoriesAsync() {
  try {
    const categories = yield* call(getCategoriesAndDocuments);
    const categoriesMap = new Map<string, Product[]>();

    if (categories !== undefined && categories !== null) {
      categories.forEach((category: Category) => {
        const newProducts = category.items.map(
          (item: any) =>
            new Product(item.id, item.name, item.imageUrl, item.price)
        );
        const lowerCaseTitle = category.title.toLowerCase();
        categoriesMap.set(lowerCaseTitle, newProducts);
      });
    }
    yield* put(fetchCategoriesSuccess(categoriesMap));
  } catch (error) {
    yield* put(fetchCategoriesFailed(error as Error));
  }
}

export function* onFetchCategories() {
  yield* takeLatest(
    CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
    yield* all([call(onFetchCategories)]);
}