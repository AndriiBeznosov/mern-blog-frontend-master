import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const loginUser = createAsyncThunk("auth/loginUser", async (params) => {
  const { data } = await axios.post("/auth/login", params);
  return data;
});

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (params) => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  },
);

export const loginUserMe = createAsyncThunk("auth/loginUserMe", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [loginUser.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    [loginUserMe.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [loginUserMe.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [loginUserMe.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    [registerUser.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [registerUser.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
