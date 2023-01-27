import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cmsCategorySlice from "./cms-slices/cms-category.slice";

export const store = configureStore({
  reducer: combineReducers({
    cmsCategoryState: cmsCategorySlice
  })
});
