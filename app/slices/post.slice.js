import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CMS_POST_LIMIT } from "../../utils/config";
import { apiListPosts } from "../apis/post.api";

const initialState = {
  /**
   * @type {Array<import("../apis/post.api").Post>}
   */
  loading: true,
  posts: [],
  total: 0,
  page: 1
}

export const fetchPosts = createAsyncThunk("posts/fetchPosts",
  /**
   *
   * @param {{
   *  page: number;
   *  category: string;
   * }} args
   */
  async (args) => {
    const { category, page } = args;
    const res = await apiListPosts({
      skip: (page - 1) * CMS_POST_LIMIT,
      limit: CMS_POST_LIMIT,
      sortBy: "createdAt",
      asc: false,
      category: category === "uncategorized" ? null : category
    });
    return res;
  });

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      const { data, total } = action.payload;
      state.total = total;
      state.posts = data;
      state.page = action.meta.arg.page;
      state.loading = false;
    });
  }
});

export default postSlice.reducer;