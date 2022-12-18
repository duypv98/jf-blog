import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { apiGetListCategories } from "../apis/category.api";

const initialState = {
  categories: [],
  loading: true
}

export const fetchCategories = createAsyncThunk("cms-categories/fetchAll", async () => {
  const data = await apiGetListCategories();
  return data;
});

const cmsCategorySlice = createSlice({
  name: "cms-categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
    })

    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    })
  }
});

export default cmsCategorySlice.reducer;