import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cmsCategorySlice from "./cms-slices/cms-category.slice";
import cmsPostsSlice from "./cms-slices/cms-posts.slice";

export const store = configureStore({
  reducer: combineReducers({
    cmsCategoryState: cmsCategorySlice,
    cmsPostState: cmsPostsSlice
  })
});
