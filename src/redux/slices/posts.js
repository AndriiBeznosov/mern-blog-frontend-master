import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

export const fetchTegs = createAsyncThunk("posts/fetchTegs", async () => {
  const { data } = await axios.get("/posts/tegs");
  return data;
});
export const removePost = createAsyncThunk(
  "posts/removePost",
  async (id) => await axios.delete(`/posts/${id}`),
);

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tegs: {
    items: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    [fetchTegs.pending]: (state) => {
      state.tegs.items = [];
      state.tegs.status = "loading";
    },
    [fetchTegs.fulfilled]: (state, action) => {
      state.tegs.items = action.payload;
      state.tegs.status = "loaded";
    },
    [fetchTegs.rejected]: (state) => {
      state.tegs.items = [];
      state.tegs.status = "error";
    },
    [removePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg,
      );
    },
  },
});

export const postsReducer = postsSlice.reducer;
