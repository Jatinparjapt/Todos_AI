import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import cookie from "js-cookie";

export const loginTodoDatabase = createAsyncThunk(
  "todoList/login",
  // email , password
  async (data, { rejectWithValue }) => {
    try {
      console.log(data, "redux");
      const response = await axios.post(
        `http://localhost:8000/api/login`,
        data
      );
      console.log(response.data, "login", response.status); // Return the data
      return ({data:response.data , status :response.status}) ;
    } catch (error) {
      console.error(error); // Log any errors
      return rejectWithValue({
        data: error.response?.data,
        status: error.response?.status,
      }); // Pass a meaningful error message to rejected
    }
  }
);

export const signupTodoDatabase = createAsyncThunk(
  "todoList/signup",
  //name , email ,password , 
  async (data, { rejectWithValue }) => {
    try {
      console.log(data, "redux");
      const response = await axios.post(
        `http://localhost:8000/api/signup`,
        data
      );
      console.log(response.data, "signup"); // Return the data
      return (response.data, response.status); // Return the data
    } catch (error) {
      console.error(error); // Log any errors
      return rejectWithValue(error.response?.data || "An error occurred"); // Pass a meaningful error message to rejected
    }
  }
);
export const logoutTodoDatabase = createAsyncThunk(
  "todoList/logout",
  // toekn , email 
  async (data, { rejectWithValue }) => {
    try {
      console.log(data, "redux");
      const response = await axios.post(
        `http://localhost:8000/api/logout`,
        data
      );
      console.log(response.data, "signup"); // Return the data
      return (response.data, response.status); // Return the data
    } catch (error) {
      console.error(error); // Log any errors
      return rejectWithValue(error.response?.data || "An error occurred"); // Pass a meaningful error message to rejected
    }
  }
);

const initialState = {
  response: "",
  isLoading: false,
  apiCallStatus: null,
};

const loginSlice = createSlice({
  name: "Login Slice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginTodoDatabase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginTodoDatabase.fulfilled, (state, action) => {
        const {data, status} = action.payload
        state.response = data.response.message;
        state.apiCallStatus = status
        // console.log(action.payload)
        cookie.set("jwtToken", data.response.jwtToken, {
          sameSite: "Strict",
          expires: 7,
        });
        cookie.set("userId", data.response.user, {
          sameSite: "Strict",
          expires: 7,
        });
        // console.log(action.payload.response, "login");
        // console.log(action.payload.response.jwtToken, "login");
        
        state.isLoading = false;
      })
      .addCase(loginTodoDatabase.rejected, (state, action) => {
        const {data, status} = action.payload
        console.log(action.payload, " login rejact")
        state.response = data.error
        console.log(data.error, " error")
        state.apiCallStatus = status
        // state.response = data
        state.isLoading = false;


      })
      .addCase(signupTodoDatabase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signupTodoDatabase.fulfilled, (state, action) => {
        state.response = action.payload;
        console.log(action.payload, "signup");
        state.isLoading = false;
      })
      .addCase(signupTodoDatabase.rejected, (state, action) => {
        state.apiCallStatus = action.payload || action.error.message;
        state.isLoading = false;
      });
  },
});

export default loginSlice.reducer;
