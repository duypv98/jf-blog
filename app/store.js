import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cmsCategorySlice from "./cms-slices/cms-category.slice";
import cmsPostsSlice from "./cms-slices/cms-posts.slice";
import cmsRevalidateSlice from "./cms-slices/cms-revalidate.slice";
import postSlice from "./slices/post.slice";

export const store = configureStore({
  reducer: combineReducers({
    cmsCategoryState: cmsCategorySlice,
    cmsPostState: cmsPostsSlice,
    cmsRevalidateState: cmsRevalidateSlice,
    postState: postSlice
  })
});
