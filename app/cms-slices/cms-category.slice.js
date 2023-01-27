import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCreateCategory, apiGetListCategories, apiUpdateCategoryById } from "../apis/category.api";

const initialState = {
  /** @type {Array<import("../apis/category.api").Category>} */
  categories: [],
  loading: true,
  currentCategory: null,
  openCreateOrUpdateCategoryModal: false
}

export const fetchCategories = createAsyncThunk("cms-categories/fetchAll", async () => {
  const data = await apiGetListCategories();
  return data;
});

export const createCategory = createAsyncThunk("cms-categories/create",
  /**
   *
   * @param {Omit<import("../apis/category.api").Category, "_id">} args
   */
  async (args) => {
    const data = await apiCreateCategory(args);
    return data;
  });

export const updateCategoryById = createAsyncThunk("cms-categoris/updateById",
  /**
   *
   * @param {{ _id: string } & Partial<Omit<import("../apis/category.api").Category, "_id">>} args
   */
  async (args) => {
    const data = await apiUpdateCategoryById(args);
    return data;
  });

const cmsCategorySlice = createSlice({
  name: "cms-categories",
  initialState,
  reducers: {
    loadCategories: (state, action) => {
      state.categories = action.payload;
      state.loading = false;
    },
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    setOpenCreateOrUpdateCategoryModal: (state, action) => {
      state.openCreateOrUpdateCategoryModal = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });

    builder.addCase(createCategory.fulfilled, (state, action) => {
      if (action.payload) {
        state.categories.push(action.payload);
      }
    });

    builder.addCase(updateCategoryById.fulfilled, (state, action) => {
      if (action.payload) {
        const index = state.categories.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) state.categories.splice(index, 1, action.payload);
      }
    });
  }
});

export const {
  loadCategories,
  setCurrentCategory,
  setOpenCreateOrUpdateCategoryModal
} = cmsCategorySlice.actions;

export default cmsCategorySlice.reducer;