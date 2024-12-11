import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the async thunk
export const getTodoList = createAsyncThunk("todoList/getTodoList", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/todolist/${id}`);
    // console.log(response.data, "from redux")
    return response.data; // Return the data
  } catch (error) {
    console.error(error); // Log any errors
    return rejectWithValue(error.response?.data || "An error occurred"); // Pass a meaningful error message to rejected
  }
});
// 
export const databaseTitleUpdate = createAsyncThunk("todoList/titleUpdate", async (data, { rejectWithValue }) => {
  // userId  , title , id
  try {
    const response = await axios.put(`http://localhost:8000/api/title`, data);
    // console.log(response.data, "from redux")
    return response.data; // Return the data
  } catch (error) {
    console.error(error); // Log any errors
    return rejectWithValue(error.response?.data || "An error occurred"); // Pass a meaningful error message to rejected
  }
});

export const databaseDescriptionUpdate = createAsyncThunk("todoList/descriptionUpdate", async (data, { rejectWithValue }) => {
 // user Id , descrijtion , id
  try {
    const response = await axios.put(`http://localhost:8000/api/description`, data);
    // console.log(response.data, "from redux")
    return response.data; // Return the data
  } catch (error) {
    console.error(error); // Log any errors
    return rejectWithValue(error.response?.data || "An error occurred"); // Pass a meaningful error message to rejected
  }
});
export const databaseStatusUpdate = createAsyncThunk("todoList/statusUpdate", async (data, { rejectWithValue }) => {
  // userId , status , id
  try {
    const response = await axios.put(`http://localhost:8000/api/status`, data);
    // console.log(response.data, "from redux")
    return response.data; // Return the data
  } catch (error) {
    console.error(error); // Log any errors
    return rejectWithValue(error.response?.data || "An error occurred"); // Pass a meaningful error message to rejected
  }
});


// Initial state
const initialState = {
  todoList: [],
  isLoading: false,
  apiCallStatus: null,
};

// Create the slice
const databaseActionsSlice = createSlice({
  name: "DatabaseActions",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getTodoList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTodoList.fulfilled, (state, action) => {
        state.todoList = action.payload;
        state.isLoading = false;
      })
      .addCase(getTodoList.rejected, (state, action) => {
        state.apiCallStatus = action.payload || action.error.message;
        state.isLoading = false;
      });
  },
});

export default databaseActionsSlice.reducer;
