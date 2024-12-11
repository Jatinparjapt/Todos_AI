import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null,
};

const todoDataUpdateSlice = createSlice({
    name: "todoDataUpdate",
    initialState,
    reducers: {
        todoDelete: (state, action) => {
            let existingData = JSON.parse(localStorage.getItem("localData"));
            let deleteTodo = existingData.filter((item) => item.id !== action.payload);
            localStorage.setItem("localData", JSON.stringify(deleteTodo));
        },
        todoStatusUpdate: (state, action) => {
            let existingData = JSON.parse(localStorage.getItem("localData"));
            let updatedData = existingData.map((item) => {
                if (item.id === action.payload.id) {
                    return { ...item, status: action.payload.status };
                }
                return item;
            });
            localStorage.setItem("localData", JSON.stringify(updatedData));
        },
        todoTitleUpdate: (state, action) => {
            let existingData = JSON.parse(localStorage.getItem("localData"));
            let updateData = existingData.map((item) => {
                if (item.id === action.payload.id) {
                    return { ...item, title: action.payload.title };
                }
                return item;
            });
            localStorage.setItem("localData", JSON.stringify(updateData));
        },
        todoDescUpdate: (state, action) => {
            let existingData = JSON.parse(localStorage.getItem("localData"));
            let updateData = existingData.map((item) => {
                if (item.id === action.payload.id) {
                    return { ...item, description: action.payload.desc };
                }
                return item;
            });
            localStorage.setItem("localData", JSON.stringify(updateData));
        },
    },
});

export const { todoDelete, todoStatusUpdate, todoTitleUpdate, todoDescUpdate } = todoDataUpdateSlice.actions;
export default todoDataUpdateSlice.reducer;
