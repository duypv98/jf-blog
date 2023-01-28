import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit"
import { apiCreatePost, apiDeletePostById, apiGetPostById, apiUpdatePostById } from "../apis/post.api";

const initialState = {
  /**
   * @type {Array<import("../apis/post.api").Post>}
   */
  posts: [],
  total: 0,
  page: 1,
  loading: true,
  currentPost: null,
  openCreateOrUpdatePostModal: false,
  mapPost: {}
}

export const createPost = createAsyncThunk("cms-posts/createOne",
  /**
   *
   * @param {Omit<import("../apis/post.api").Post, "_id" | "createdAt" | "updatedAt">} args
   */
  async (args) => {
    const data = await apiCreatePost(args);
    return data;
  })

export const fetchCurrentPostById = createAsyncThunk("cms-posts/fetchCurrentPostById",
  /**
   *
   * @param {{ id: string; showEditModal?: boolean}} args
   */
  async (args) => {
    const { id, showEditModal } = args;
    const post = await apiGetPostById(id);
    return {
      post,
      showEditModal
    }
  });

export const updatePostById = createAsyncThunk("cms-posts/updateById",
  /**
   *
   * @param {{ _id: string} & Partial<Pick<import("../apis/post.api").Post, "title" | "slug" | "content" | "isPrivate" | "category">} args
   */
  async (args) => {
    const data = await apiUpdatePostById(args);
    return data;
  });

export const deletePostById = createAsyncThunk("cms-posts/deleteById",
  /**
   *
   * @param {string} id
   */
  async (id) => {
    const data = await apiDeletePostById(id);
    return data;
  });

const cmsPostSlice = createSlice({
  name: "cms-posts",
  initialState,
  reducers: {
    loadPosts: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    },
    setTotalPosts: (state, action) => {
      state.total = action.payload;
    },
    setPostListPage: (state, action) => {
      state.page = action.payload;
    },
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    },
    setOpenCreateOrUpdatePostModal: (state, action) => {
      state.openCreateOrUpdatePostModal = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createPost.fulfilled, (state, action) => {
      if (action.payload) {
        if (state.page === 1) {
          state.posts = [action.payload, ...state.posts.slice(0, -1)]
        }
      }
    });

    builder.addCase(fetchCurrentPostById.fulfilled, (state, action) => {
      const { showEditModal, post } = action.payload;
      if (post) {
        state.currentPost = post;
        state.openCreateOrUpdatePostModal = showEditModal;
        state.mapPost[post._id] = post;
      }
    });

    builder.addCase(updatePostById.fulfilled, (state, action) => {
      if (action.payload) {
        const index = state.posts.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) state.posts.splice(index, 1, action.payload);
        state.mapPost[action.payload._id] = action.payload;
      }
    });

    builder.addMatcher(isAnyOf(deletePostById.rejected, deletePostById.fulfilled), (state, action) => {
      const postId = action.meta.arg;
      const index = state.posts.findIndex((p) => p._id === postId);
      if (index !== -1) state.posts.splice(index, 1);
    });
  }
});

export const {
  loadPosts,
  setPostListPage,
  setTotalPosts,
  setCurrentPost,
  setOpenCreateOrUpdatePostModal
} = cmsPostSlice.actions;

export default cmsPostSlice.reducer;