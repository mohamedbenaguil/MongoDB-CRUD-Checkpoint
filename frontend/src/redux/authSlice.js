import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  user: null,
  auth: false,
  loading: false,
};

// register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("api/auth/signUp", data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

// login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("api/auth/signIn", data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

// get auth user

export const currentUser = createAsyncThunk(
  "auth/currentUser",
  async (arg, { rejectWithValue }) => {
    const Config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    try {
      const res = await axios.get("api/auth/current", Config);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state, { payload }) => {
      state.user = null;
      state.auth = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.auth = true;
        state.loading = false;
        localStorage.setItem("token", payload.token);
        toast.success(payload.msg)
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.user = null;
        state.auth = false;
        state.loading = false;
        payload.forEach((error) => toast.error(error.msg));
      })
      .addCase(loginUser.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.auth = true;
        state.loading = false;
        localStorage.setItem("token", payload.token);
        toast.success(payload.msg)
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.user = null;
        state.auth = false;
        state.loading = false;
        payload.forEach((error) => toast.error(error.msg));
      })
      .addCase(currentUser.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(currentUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.auth = true;
        state.loading = false;
        toast.success(payload.msg)
      })
      .addCase(currentUser.rejected, (state, { payload }) => {
        state.user = null;
        state.auth = false;
        state.loading = false;
        payload.forEach((error) => toast.error(error.msg));
      });
  },
});
export const { logOut } = authSlice.actions;
export default authSlice.reducer;
