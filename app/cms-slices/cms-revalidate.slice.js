import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit"
import { apiRevalidate } from "../apis/revalidate.api"

const initialState = {
  path: null,
  revalidating: false
}

export const requestRevalidate = createAsyncThunk("cms-revalidate/revalidate", async (path) => {
  const revalidated = await apiRevalidate(path);
  return revalidated;
})

const cmsRevalidateSlice = createSlice({
  name: "cms-revalidate",
  initialState,
  reducers: {
    /**
     *
     * @param {*} state
     * @param {import("@reduxjs/toolkit").PayloadAction<string>} action
     */
    revalidate: (state, action) => {
      state.path = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(requestRevalidate.pending, (state) => {
      state.revalidating = true;
    });

    builder.addMatcher(isAnyOf(requestRevalidate.rejected, requestRevalidate.fulfilled), (state) => {
      state.revalidating = false;
      state.path = null;
    })
  }
});

export const {
  revalidate
} = cmsRevalidateSlice.actions;

export default cmsRevalidateSlice.reducer;